/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Link as LinkIcon,
  Calendar,
  Github,
  Linkedin,
  Plus,
  ListMusic,
  Trash2,
  Heart,
  X,
  Search,
  Check,
  BookOpen,
  Code2,
  Trophy,
  Clock,
  Edit2,
  Loader2
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "../context/AuthContext";
import { useProblem } from "../context/ProblemContext";
import { usePlaylist } from "../context/PlaylistContext";
import { Problem } from "../data/problems";

// --- INTERFACES ---
interface PlaylistProblem {
  _id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  slug?: string;
}

interface Playlist {
  _id: string;
  title: string;
  description: string;
  problems: PlaylistProblem[];
  createdAt: string;
}

interface UserProfileData {
  name: string;
  username: string;
  city: string;
  country: string;
  website?: string;
  joinedDate?: string;
  bio?: string;
  skills?: string[];
  recentActivity?: { date: string; problems: string[] }[];
}

const initialUserProfile: UserProfileData = {
  name: "User",
  username: "user",
  city: "",
  country: "",
  website: "",
  joinedDate: "",
  bio: "",
  skills: [],
  recentActivity: [],
};

export default function Profile() {
  const { updateUserProfileInfo, user } = useAuth();

  const { problems, fetchAllProblems } = useProblem();

  const {
    playlists,
    fetchPlaylists,
    createNewPlaylist,
    addProblemToPlaylist,
    removeProblemFromPlaylist,
    removePlaylist,
    loading: playlistLoading
  } = usePlaylist();

  const [userProfile, setUserProfile] = useState<UserProfileData>(initialUserProfile);

  useEffect(() => {
    fetchPlaylists();
    fetchAllProblems();
  }, []);

  // --- UPDATED STATS CALCULATION ---
  const calculatedStats = useMemo(() => {
    // Default structure
    const stats = {
      total: { solved: 0, count: 0 },
      easy: { solved: 0, count: 0 },
      medium: { solved: 0, count: 0 },
      hard: { solved: 0, count: 0 },
      monthsActive: 0
    };

    if (!user || !problems) return stats;

    const solvedSet = new Set(user.solvedProblems || []);

    // 1. Calculate problem counts (Total vs Solved)
    problems.forEach((p: Problem) => {
      const diff = p.difficulty.toLowerCase() as "easy" | "medium" | "hard";

      // Increment total count for this difficulty
      if (stats[diff] !== undefined) {
        stats[diff].count++;
        stats.total.count++;
      }

      // Increment solved count if user solved it
      if (solvedSet.has(p._id)) {
        if (stats[diff] !== undefined) {
          stats[diff].solved++;
          stats.total.solved++;
        }
      }
    });

    // 2. Calculate Months Active
    const joined = new Date(user.createdAt || Date.now());
    const now = new Date();
    stats.monthsActive = (now.getFullYear() - joined.getFullYear()) * 12 + (now.getMonth() - joined.getMonth()) || 1;

    return stats;
  }, [user, problems]);

  useEffect(() => {
    if (user) {
      setUserProfile({
        name: user.name || user.username || "User",
        username: user.username || "user",
        city: user.city || "Unknown City",
        country: user.country || "Unknown Country",
        website: user.website || "",
        bio: user.bio || "No bio yet.",
        skills: user.skills || [],
        joinedDate: new Date(user.createdAt).toLocaleDateString("en-US", { month: 'long', year: 'numeric' }),
        recentActivity: []
      });
    }
  }, [user]);

  // Percentage for the main circular progress bar
  const totalProgressPercentage = calculatedStats.total.count > 0
    ? (calculatedStats.total.solved / calculatedStats.total.count) * 100
    : 0;

  // --- UI STATE ---
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isAddProblemsOpen, setIsAddProblemsOpen] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [problemSearchQuery, setProblemSearchQuery] = useState("");
  const [newPlaylist, setNewPlaylist] = useState({ title: "", description: "" });
  const [expandedPlaylist, setExpandedPlaylist] = useState<string | null>(null);
  const [justCreatedPlaylistId, setJustCreatedPlaylistId] = useState<string | null>(null);

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [editProfile, setEditProfile] = useState({
    city: "",
    country: "",
    bio: "",
    skills: [] as string[],
  });
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    if (isEditProfileOpen) {
      setEditProfile({
        city: userProfile.city,
        country: userProfile.country,
        bio: userProfile.bio || "",
        skills: userProfile.skills || [],
      });
    }
  }, [isEditProfileOpen, userProfile]);

  const handleSaveProfile = () => {
    updateUserProfileInfo({
      city: editProfile.city,
      country: editProfile.country,
      bio: editProfile.bio,
      skills: editProfile.skills,
    });
    setIsEditProfileOpen(false);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !editProfile.skills.includes(newSkill.trim())) {
      setEditProfile({
        ...editProfile,
        skills: [...editProfile.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setEditProfile({
      ...editProfile,
      skills: editProfile.skills.filter(skill => skill !== skillToRemove),
    });
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylist.title.trim()) return;
    try {
      const createdPlaylist = await createNewPlaylist(newPlaylist.title, newPlaylist.description);
      setNewPlaylist({ title: "", description: "" });
      setIsCreateOpen(false);

      if (createdPlaylist && createdPlaylist._id) {
        setJustCreatedPlaylistId(createdPlaylist._id);
        setSelectedPlaylistId(createdPlaylist._id);
        setIsAddProblemsOpen(true);
      }
    } catch (error) {
      console.error("Failed to create playlist");
    }
  };

  const handleDeletePlaylist = async (id: string) => {
    if (confirm("Are you sure you want to delete this playlist?")) {
      await removePlaylist(id);
    }
  };

  const handleRemoveProblem = async (playlistId: string, problemId: string) => {
    await removeProblemFromPlaylist(playlistId, problemId);
  };

  const handleAddProblem = async (playlistId: string, problemId: string) => {
    await addProblemToPlaylist(playlistId, problemId);
  };

  const isProblemInPlaylist = (playlistId: string, problemId: string) => {
    const playlist = playlists?.find((p: any) => p._id === playlistId);
    return playlist?.problems?.some((prob: any) => prob._id === problemId) || false;
  };

  const filteredProblemsForPlaylist = problems.filter((problem: Problem) =>
    problem.title.toLowerCase().includes(problemSearchQuery.toLowerCase())
  );

  const selectedPlaylist = playlists?.find((p: any) => p._id === selectedPlaylistId);

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case "easy": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "hard": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "";
    }
  };

  const TOTAL_PLATFORM_PROBLEMS = 150;

  return (
    <Layout isLoggedIn>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="glass-card p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-primary-foreground uppercase">
                  {userProfile.name.charAt(0)}
                </div>
                <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-card border-border max-w-md">
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>Update your profile information</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4 max-h-[60vh] overflow-y-auto">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">City</label>
                          <Input
                            placeholder="e.g., San Francisco"
                            value={editProfile.city}
                            onChange={(e) => setEditProfile({ ...editProfile, city: e.target.value })}
                            className="bg-secondary/50 border-border"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Country</label>
                          <Input
                            placeholder="e.g., United States"
                            value={editProfile.country}
                            onChange={(e) => setEditProfile({ ...editProfile, country: e.target.value })}
                            className="bg-secondary/50 border-border"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Bio</label>
                        <Textarea
                          placeholder="Tell us about yourself..."
                          value={editProfile.bio}
                          onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })}
                          className="bg-secondary/50 border-border resize-none"
                          rows={4}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Skills</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {editProfile.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs flex items-center gap-1 pr-1">
                              {skill}
                              <button onClick={() => handleRemoveSkill(skill)} className="ml-1 hover:text-destructive transition-colors">
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a skill..."
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddSkill();
                              }
                            }}
                            className="bg-secondary/50 border-border"
                          />
                          <Button type="button" variant="outline" size="icon" onClick={handleAddSkill}>
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <Button onClick={handleSaveProfile} className="w-full">Save Changes</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <h1 className="text-2xl font-bold mb-1">{userProfile.name}</h1>
              <p className="text-muted-foreground mb-4">@{userProfile.username}</p>
              <p className="text-sm text-foreground/80 mb-4">{userProfile.bio}</p>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {userProfile.city || "Unknown"}, {userProfile.country || "Unknown"}
                </div>
                {userProfile.website && (
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    <a href={userProfile.website} className="text-primary hover:underline">
                      {userProfile.website.replace("https://", "")}
                    </a>
                  </div>
                )}
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
                {userProfile.skills && userProfile.skills.length > 0 ? (
                  userProfile.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">No skills added yet.</span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Activity */}
          <div className="lg:col-span-2 space-y-6">

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-4 text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">{calculatedStats.total.solved}</div>
                <div className="text-sm text-muted-foreground">Problems Solved</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-difficulty-easy/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-difficulty-easy" />
                </div>
                <div className="text-3xl font-bold text-difficulty-easy">{playlists.length}</div>
                <div className="text-sm text-muted-foreground">Playlists Created</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-difficulty-medium/20 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-difficulty-medium" />
                </div>
                <div className="text-3xl font-bold text-difficulty-medium">{userProfile.skills?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Skills Mastered</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-accent/50 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-foreground" />
                </div>
                <div className="text-3xl font-bold text-foreground">{calculatedStats.monthsActive}+</div>
                <div className="text-sm text-muted-foreground">Months Active</div>
              </div>
            </div>

            {/* Solved Problems Progress */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-6">Solved Problems</h3>

              <div className="flex items-center gap-8 mb-6">
                {/* Circular Progress */}
                <div className="relative w-32 h-32 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    {/* 1. Background Circle (Gray) */}
                    <circle 
                      className="stroke-secondary" 
                      strokeWidth="10" 
                      fill="transparent" 
                      r="52" cx="64" cy="64" 
                    />
                    
                    {/* 2. Easy Segment (Green) */}
                    <circle
                      className="stroke-green-500 transition-all duration-1000 ease-out"
                      strokeWidth="10"
                      fill="transparent"
                      r="52" cx="64" cy="64"
                      strokeDasharray={`${(calculatedStats.easy.solved / TOTAL_PLATFORM_PROBLEMS) * 327} 327`}
                      strokeDashoffset="0"
                    />

                    {/* 3. Medium Segment (Yellow) */}
                    <circle
                      className="stroke-yellow-500 transition-all duration-1000 ease-out"
                      strokeWidth="10"
                      fill="transparent"
                      r="52" cx="64" cy="64"
                      strokeDasharray={`${(calculatedStats.medium.solved / TOTAL_PLATFORM_PROBLEMS) * 327} 327`}
                      strokeDashoffset={-((calculatedStats.easy.solved / TOTAL_PLATFORM_PROBLEMS) * 327)}
                    />

                    {/* 4. Hard Segment (Red) */}
                    <circle
                      className="stroke-red-500 transition-all duration-1000 ease-out"
                      strokeWidth="10"
                      fill="transparent"
                      r="52" cx="64" cy="64"
                      strokeDasharray={`${(calculatedStats.hard.solved / TOTAL_PLATFORM_PROBLEMS) * 327} 327`}
                      strokeDashoffset={-(
                        ((calculatedStats.easy.solved / TOTAL_PLATFORM_PROBLEMS) * 327) + 
                        ((calculatedStats.medium.solved / TOTAL_PLATFORM_PROBLEMS) * 327)
                      )}
                    />
                  </svg>
                  
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-foreground">{calculatedStats.total.solved}</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Solved</span>
                  </div>
                </div>

                {/* Difficulty Breakdown */}
                <div className="flex-1 space-y-4">
                  {/* Easy */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-green-500 font-medium">Easy</span>
                      <span className="text-muted-foreground">
                        {calculatedStats.easy.solved} <span className="text-muted-foreground/60">/ {calculatedStats.easy.count}</span>
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${calculatedStats.easy.count > 0 ? (calculatedStats.easy.solved / calculatedStats.easy.count) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                  {/* Medium */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-yellow-500 font-medium">Medium</span>
                      <span className="text-muted-foreground">
                        {calculatedStats.medium.solved} <span className="text-muted-foreground/60">/ {calculatedStats.medium.count}</span>
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                        style={{ width: `${calculatedStats.medium.count > 0 ? (calculatedStats.medium.solved / calculatedStats.medium.count) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                  {/* Hard */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-red-500 font-medium">Hard</span>
                      <span className="text-muted-foreground">
                        {calculatedStats.hard.solved} <span className="text-muted-foreground/60">/ {calculatedStats.hard.count}</span>
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${calculatedStats.hard.count > 0 ? (calculatedStats.hard.solved / calculatedStats.hard.count) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* My Playlists (REAL DATA) */}
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
                      <Button onClick={handleCreatePlaylist} className="w-full" disabled={playlistLoading}>
                        {playlistLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Create Playlist"}
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
                  {playlists.map((playlist: any) => (
                    <div key={playlist._id} className="border border-border rounded-lg overflow-hidden">
                      <div
                        className="p-4 bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors"
                        onClick={() => setExpandedPlaylist(expandedPlaylist === playlist._id ? null : playlist._id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                              <Heart className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">{playlist.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {playlist.problems.length} problems • Created {new Date(playlist.createdAt).toLocaleDateString()}
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
                                setSelectedPlaylistId(playlist._id);
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
                                handleDeletePlaylist(playlist._id);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        {playlist.description && <p className="text-sm text-muted-foreground mt-2 ml-13">{playlist.description}</p>}
                      </div>

                      {expandedPlaylist === playlist._id && (
                        <div className="border-t border-border">
                          {playlist.problems.length === 0 ? (
                            <div className="p-4 text-center text-muted-foreground text-sm">
                              No problems in this playlist yet. Add problems from the Problems page!
                            </div>
                          ) : (
                            <div className="divide-y divide-border">
                              {playlist.problems.map((problem: any) => (
                                <div key={problem._id} className="p-3 flex items-center justify-between hover:bg-secondary/20">
                                  <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium">{problem.title}</span>
                                    <Badge className={`text-xs ${getDifficultyClass(problem.difficulty)}`}>{problem.difficulty}</Badge>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                    onClick={() => handleRemoveProblem(playlist._id, problem._id)}
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
                    {filteredProblemsForPlaylist.map((problem: Problem) => {
                      const isAdded = selectedPlaylistId ? isProblemInPlaylist(selectedPlaylistId, problem._id) : false;

                      return (
                        <div
                          key={problem._id}
                          className={`p-3 rounded-lg border transition-colors ${isAdded
                            ? "border-primary/50 bg-primary/10"
                            : "border-border bg-secondary/30 hover:bg-secondary/50"
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
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
                                    handleRemoveProblem(selectedPlaylistId, problem._id);
                                  } else {
                                    handleAddProblem(selectedPlaylistId, problem._id);
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
                  <Button onClick={() => setIsAddProblemsOpen(false)} className="w-full">Done</Button>
                </div>
              </DialogContent>
            </Dialog>

          </div>
        </div>
      </div>
    </Layout>
  );
}