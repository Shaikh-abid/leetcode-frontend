import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  MapPin, 
  Link as LinkIcon, 
  Calendar, 
  Github, 
  Linkedin,
  Target,
  Flame,
  Edit2,
  Plus,
  ListMusic,
  Trash2,
  Heart,
  X,
  Search,
  Check
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { problems } from "@/data/problems";

interface PlaylistProblem {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

interface Playlist {
  id: string;
  title: string;
  description: string;
  problems: PlaylistProblem[];
  createdAt: string;
}

const userProfile = {
  name: "Alex Johnson",
  username: "alexj_dev",
  avatar: null,
  location: "San Francisco, CA",
  website: "https://alexjohnson.dev",
  github: "alexjohnson",
  linkedin: "alexjohnson",
  joinedDate: "March 2023",
  bio: "Full-stack developer passionate about algorithms and system design. Currently preparing for FAANG interviews.",
  stats: {
    totalSolved: 287,
    easySolved: 125,
    mediumSolved: 132,
    hardSolved: 30,
    ranking: 15420,
    streak: 45,
    contestsParticipated: 12,
    contestRating: 1650,
  },
  recentActivity: [
    { date: "Today", problems: ["Two Sum", "Valid Parentheses"] },
    { date: "Yesterday", problems: ["Add Two Numbers", "Merge Two Sorted Lists"] },
    { date: "2 days ago", problems: ["Maximum Subarray"] },
  ],
  skills: ["Dynamic Programming", "Graph Algorithms", "Binary Search", "Two Pointers", "Sliding Window"],
};

const initialPlaylists: Playlist[] = [
  {
    id: "1",
    title: "FAANG Interview Prep",
    description: "Must-solve problems for top tech company interviews",
    problems: [
      { id: 1, title: "Two Sum", difficulty: "Easy" },
      { id: 2, title: "LRU Cache", difficulty: "Medium" },
      { id: 3, title: "Merge K Sorted Lists", difficulty: "Hard" },
    ],
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Dynamic Programming",
    description: "Essential DP patterns and problems",
    problems: [
      { id: 4, title: "Climbing Stairs", difficulty: "Easy" },
      { id: 5, title: "Coin Change", difficulty: "Medium" },
    ],
    createdAt: "2024-01-10",
  },
];

export default function Profile() {
  const { stats } = userProfile;
  const totalProblems = 2500;
  const progressPercentage = (stats.totalSolved / totalProblems) * 100;

  const [playlists, setPlaylists] = useState<Playlist[]>(initialPlaylists);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isAddProblemsOpen, setIsAddProblemsOpen] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [problemSearchQuery, setProblemSearchQuery] = useState("");
  const [newPlaylist, setNewPlaylist] = useState({ title: "", description: "" });
  const [expandedPlaylist, setExpandedPlaylist] = useState<string | null>(null);
  const [justCreatedPlaylistId, setJustCreatedPlaylistId] = useState<string | null>(null);

  const handleCreatePlaylist = () => {
    if (!newPlaylist.title.trim()) return;
    
    const playlistId = Date.now().toString();
    const playlist: Playlist = {
      id: playlistId,
      title: newPlaylist.title,
      description: newPlaylist.description,
      problems: [],
      createdAt: new Date().toISOString().split("T")[0],
    };
    
    setPlaylists([playlist, ...playlists]);
    setNewPlaylist({ title: "", description: "" });
    setIsCreateOpen(false);
    setJustCreatedPlaylistId(playlistId);
    setSelectedPlaylistId(playlistId);
    setIsAddProblemsOpen(true);
  };

  const handleDeletePlaylist = (id: string) => {
    setPlaylists(playlists.filter(p => p.id !== id));
  };

  const handleRemoveProblem = (playlistId: string, problemId: number) => {
    setPlaylists(playlists.map(p => 
      p.id === playlistId 
        ? { ...p, problems: p.problems.filter(prob => prob.id !== problemId) }
        : p
    ));
  };

  const handleAddProblemToPlaylist = (playlistId: string, problem: PlaylistProblem) => {
    setPlaylists(playlists.map(p => {
      if (p.id === playlistId) {
        // Check if problem already exists
        if (p.problems.some(prob => prob.id === problem.id)) {
          return p;
        }
        return { ...p, problems: [...p.problems, problem] };
      }
      return p;
    }));
  };

  const handleRemoveProblemFromPlaylist = (playlistId: string, problemId: number) => {
    setPlaylists(playlists.map(p => 
      p.id === playlistId 
        ? { ...p, problems: p.problems.filter(prob => prob.id !== problemId) }
        : p
    ));
  };

  const isProblemInPlaylist = (playlistId: string, problemId: number) => {
    const playlist = playlists.find(p => p.id === playlistId);
    return playlist?.problems.some(prob => prob.id === problemId) || false;
  };

  const filteredProblems = problems.filter(problem =>
    problem.title.toLowerCase().includes(problemSearchQuery.toLowerCase())
  );

  const selectedPlaylist = playlists.find(p => p.id === selectedPlaylistId);

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-difficulty-easy/15 text-difficulty-easy";
      case "Medium": return "bg-difficulty-medium/15 text-difficulty-medium";
      case "Hard": return "bg-difficulty-hard/15 text-difficulty-hard";
      default: return "";
    }
  };

  return (
    <Layout isLoggedIn>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="glass-card p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-primary-foreground">
                  {userProfile.name.charAt(0)}
                </div>
                <Button variant="ghost" size="icon">
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>
              
              <h1 className="text-2xl font-bold mb-1">{userProfile.name}</h1>
              <p className="text-muted-foreground mb-4">@{userProfile.username}</p>
              
              <p className="text-sm text-foreground/80 mb-4">{userProfile.bio}</p>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {userProfile.location}
                </div>
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" />
                  <a href={userProfile.website} className="text-primary hover:underline">
                    {userProfile.website.replace("https://", "")}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Joined {userProfile.joinedDate}
                </div>
              </div>
              
              <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                <a href="#" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Skills */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-4 text-center">
                <div className="text-3xl font-bold text-primary">{stats.totalSolved}</div>
                <div className="text-sm text-muted-foreground">Problems Solved</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-3xl font-bold text-foreground">#{stats.ranking}</div>
                <div className="text-sm text-muted-foreground">Global Ranking</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-3xl font-bold text-orange-500">{stats.streak}</div>
                <div className="text-sm text-muted-foreground">Day Streak 🔥</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-3xl font-bold text-primary">{stats.contestRating}</div>
                <div className="text-sm text-muted-foreground">Contest Rating</div>
              </div>
            </div>

            {/* Problem Solving Progress */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-6">Solved Problems</h3>
              
              <div className="flex items-center gap-8 mb-6">
                {/* Circular Progress */}
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="stroke-secondary"
                      strokeWidth="10"
                      fill="transparent"
                      r="52"
                      cx="64"
                      cy="64"
                    />
                    <circle
                      className="stroke-primary"
                      strokeWidth="10"
                      fill="transparent"
                      r="52"
                      cx="64"
                      cy="64"
                      strokeDasharray={`${progressPercentage * 3.27} 327`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">{stats.totalSolved}</span>
                    <span className="text-xs text-muted-foreground">solved</span>
                  </div>
                </div>

                {/* Difficulty Breakdown */}
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="difficulty-easy font-medium">Easy</span>
                      <span className="text-muted-foreground">{stats.easySolved} / 750</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-difficulty-easy rounded-full"
                        style={{ width: `${(stats.easySolved / 750) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="difficulty-medium font-medium">Medium</span>
                      <span className="text-muted-foreground">{stats.mediumSolved} / 1250</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-difficulty-medium rounded-full"
                        style={{ width: `${(stats.mediumSolved / 1250) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="difficulty-hard font-medium">Hard</span>
                      <span className="text-muted-foreground">{stats.hardSolved} / 500</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-difficulty-hard rounded-full"
                        style={{ width: `${(stats.hardSolved / 500) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {userProfile.recentActivity.map((activity) => (
                  <div key={activity.date} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">{activity.date}</div>
                      <div className="flex flex-wrap gap-2">
                        {activity.problems.map((problem) => (
                          <Badge key={problem} variant="secondary" className="text-xs">
                            {problem}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Playlists */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <ListMusic className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">My Playlists</h3>
                </div>
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Create Playlist
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-card border-border">
                    <DialogHeader>
                      <DialogTitle>Create New Playlist</DialogTitle>
                      <DialogDescription>
                        Create a playlist to organize your favorite problems
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Title</label>
                        <Input
                          placeholder="e.g., Interview Prep"
                          value={newPlaylist.title}
                          onChange={(e) => setNewPlaylist({ ...newPlaylist, title: e.target.value })}
                          className="bg-secondary/50 border-border"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Description</label>
                        <Textarea
                          placeholder="Describe your playlist..."
                          value={newPlaylist.description}
                          onChange={(e) => setNewPlaylist({ ...newPlaylist, description: e.target.value })}
                          className="bg-secondary/50 border-border resize-none"
                          rows={3}
                        />
                      </div>
                      <Button onClick={handleCreatePlaylist} className="w-full">
                        Create Playlist
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {playlists.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ListMusic className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No playlists yet. Create one to organize your favorite problems!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {playlists.map((playlist) => (
                    <div 
                      key={playlist.id} 
                      className="border border-border rounded-lg overflow-hidden"
                    >
                      <div 
                        className="p-4 bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors"
                        onClick={() => setExpandedPlaylist(
                          expandedPlaylist === playlist.id ? null : playlist.id
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                              <Heart className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">{playlist.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {playlist.problems.length} problems • Created {playlist.createdAt}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPlaylistId(playlist.id);
                                setIsAddProblemsOpen(true);
                              }}
                            >
                              <Plus className="w-3 h-3" />
                              Add
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeletePlaylist(playlist.id);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        {playlist.description && (
                          <p className="text-sm text-muted-foreground mt-2 ml-13">
                            {playlist.description}
                          </p>
                        )}
                      </div>

                      {expandedPlaylist === playlist.id && (
                        <div className="border-t border-border">
                          {playlist.problems.length === 0 ? (
                            <div className="p-4 text-center text-muted-foreground text-sm">
                              No problems in this playlist yet. Add problems from the Problems page!
                            </div>
                          ) : (
                            <div className="divide-y divide-border">
                              {playlist.problems.map((problem) => (
                                <div 
                                  key={problem.id}
                                  className="p-3 flex items-center justify-between hover:bg-secondary/20"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium">{problem.title}</span>
                                    <Badge className={`text-xs ${getDifficultyClass(problem.difficulty)}`}>
                                      {problem.difficulty}
                                    </Badge>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                    onClick={() => handleRemoveProblem(playlist.id, problem.id)}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add Problems Dialog */}
            <Dialog open={isAddProblemsOpen} onOpenChange={(open) => {
              setIsAddProblemsOpen(open);
              if (!open) {
                setProblemSearchQuery("");
                setJustCreatedPlaylistId(null);
              }
            }}>
              <DialogContent className="glass-card border-border max-w-lg max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Add Problems to {selectedPlaylist?.title}</DialogTitle>
                  <DialogDescription>
                    {justCreatedPlaylistId === selectedPlaylistId 
                      ? "Your playlist was created! Now add some problems to it."
                      : "Search and add problems to your playlist"
                    }
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search problems..."
                      value={problemSearchQuery}
                      onChange={(e) => setProblemSearchQuery(e.target.value)}
                      className="pl-10 bg-secondary/50 border-border"
                    />
                  </div>
                  <div className="max-h-[400px] overflow-y-auto space-y-2">
                    {filteredProblems.map((problem) => {
                      const isAdded = selectedPlaylistId ? isProblemInPlaylist(selectedPlaylistId, problem.id) : false;
                      return (
                        <div
                          key={problem.id}
                          className={`p-3 rounded-lg border transition-colors ${
                            isAdded 
                              ? "border-primary/50 bg-primary/10" 
                              : "border-border bg-secondary/30 hover:bg-secondary/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-muted-foreground w-6">{problem.id}.</span>
                              <span className="text-sm font-medium">{problem.title}</span>
                              <Badge className={`text-xs ${getDifficultyClass(problem.difficulty)}`}>
                                {problem.difficulty}
                              </Badge>
                            </div>
                            <Button
                              variant={isAdded ? "ghost" : "outline"}
                              size="sm"
                              className={isAdded ? "text-primary" : ""}
                              onClick={() => {
                                if (selectedPlaylistId) {
                                  if (isAdded) {
                                    handleRemoveProblemFromPlaylist(selectedPlaylistId, problem.id);
                                  } else {
                                    handleAddProblemToPlaylist(selectedPlaylistId, {
                                      id: problem.id,
                                      title: problem.title,
                                      difficulty: problem.difficulty,
                                    });
                                  }
                                }
                              }}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-4 h-4 mr-1" />
                                  Added
                                </>
                              ) : (
                                <>
                                  <Plus className="w-4 h-4 mr-1" />
                                  Add
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Button 
                    onClick={() => setIsAddProblemsOpen(false)} 
                    className="w-full"
                  >
                    Done
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </Layout>
  );
}
