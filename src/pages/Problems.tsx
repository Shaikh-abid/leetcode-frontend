import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Circle,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { problems, allTags, type Difficulty } from "@/data/problems";

const ITEMS_PER_PAGE = 10;

export default function Problems() {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);

  // Mock solved problems (in real app, this would come from user data)
  const solvedProblems = new Set([1, 5]);

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesSearch = problem.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      
      const matchesDifficulty =
        difficultyFilter === "all" || problem.difficulty === difficultyFilter;
      
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "solved" && solvedProblems.has(problem.id)) ||
        (statusFilter === "unsolved" && !solvedProblems.has(problem.id));
      
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => problem.tags.includes(tag));
      
      return matchesSearch && matchesDifficulty && matchesStatus && matchesTags;
    });
  }, [searchQuery, difficultyFilter, statusFilter, selectedTags]);

  const totalPages = Math.ceil(filteredProblems.length / ITEMS_PER_PAGE);
  const paginatedProblems = filteredProblems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setDifficultyFilter("all");
    setStatusFilter("all");
    setSelectedTags([]);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery || difficultyFilter !== "all" || statusFilter !== "all" || selectedTags.length > 0;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Problems</h1>
          <p className="text-muted-foreground">
            Practice coding problems to sharpen your skills
          </p>
        </div>

        {/* Filters */}
        <div className="glass-card p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>

            {/* Difficulty Filter */}
            <Select
              value={difficultyFilter}
              onValueChange={(value) => {
                setDifficultyFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="solved">Solved</SelectItem>
                <SelectItem value="unsolved">Unsolved</SelectItem>
              </SelectContent>
            </Select>

            {/* Tags Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowTagsDropdown(!showTagsDropdown)}
                className="w-full lg:w-auto"
              >
                <Filter className="w-4 h-4 mr-2" />
                Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
              </Button>
              
              {showTagsDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 glass-card p-4 z-50 max-h-64 overflow-y-auto">
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters}>
                <X className="w-4 h-4 mr-2" />
                Clear
              </Button>
            )}
          </div>

          {/* Selected Tags */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="default"
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Problems Table */}
        <div className="glass-card overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-border text-sm font-medium text-muted-foreground">
            <div className="col-span-1">Status</div>
            <div className="col-span-5 lg:col-span-5">Title</div>
            <div className="col-span-3 lg:col-span-3 hidden sm:block">Tags</div>
            <div className="col-span-2 lg:col-span-2">Difficulty</div>
            <div className="col-span-1 text-right hidden md:block">Acceptance</div>
          </div>

          {/* Table Body */}
          {paginatedProblems.length > 0 ? (
            paginatedProblems.map((problem) => (
              <Link
                key={problem.id}
                to={`/problems/${problem.slug}`}
                className="grid grid-cols-12 gap-4 p-4 border-b border-border last:border-b-0 hover:bg-accent/50 transition-colors items-center"
              >
                <div className="col-span-1">
                  {solvedProblems.has(problem.id) ? (
                    <CheckCircle2 className="w-5 h-5 text-difficulty-easy" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div className="col-span-5 lg:col-span-5">
                  <span className="font-medium hover:text-primary transition-colors">
                    {problem.id}. {problem.title}
                  </span>
                </div>
                <div className="col-span-3 lg:col-span-3 hidden sm:flex flex-wrap gap-1">
                  {problem.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {problem.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{problem.tags.length - 2}
                    </Badge>
                  )}
                </div>
                <div className="col-span-2 lg:col-span-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      problem.difficulty === "Easy"
                        ? "bg-difficulty-easy"
                        : problem.difficulty === "Medium"
                        ? "bg-difficulty-medium"
                        : "bg-difficulty-hard"
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                </div>
                <div className="col-span-1 text-right text-muted-foreground hidden md:block">
                  {problem.acceptance}%
                </div>
              </Link>
            ))
          ) : (
            <div className="p-12 text-center text-muted-foreground">
              <p>No problems found matching your criteria.</p>
              <Button variant="link" onClick={clearFilters} className="mt-2">
                Clear filters
              </Button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredProblems.length)} of{" "}
              {filteredProblems.length} problems
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
