import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  MapPin, 
  Link as LinkIcon, 
  Calendar, 
  Github, 
  Linkedin,
  Trophy,
  Target,
  Flame,
  Star,
  Edit2
} from "lucide-react";

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
  badges: [
    { name: "100 Days Streak", icon: Flame, color: "text-orange-500" },
    { name: "Problem Solver", icon: Target, color: "text-primary" },
    { name: "Contest Regular", icon: Trophy, color: "text-yellow-500" },
  ],
};

export default function Profile() {
  const { stats } = userProfile;
  const totalProblems = 2500; // Total available problems
  const progressPercentage = (stats.totalSolved / totalProblems) * 100;

  return (
    <Layout isLoggedIn>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="glass-card p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-3xl font-bold text-primary-foreground">
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

            {/* Badges */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">Badges</h3>
              <div className="grid grid-cols-3 gap-4">
                {userProfile.badges.map((badge) => (
                  <div key={badge.name} className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                      <badge.icon className={`w-6 h-6 ${badge.color}`} />
                    </div>
                    <span className="text-xs text-muted-foreground">{badge.name}</span>
                  </div>
                ))}
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
                <div className="text-3xl font-bold text-yellow-500">{stats.contestRating}</div>
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

            {/* Contest Performance */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">Contest Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium">Contests Participated</span>
                  </div>
                  <div className="text-2xl font-bold">{stats.contestsParticipated}</div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-primary" />
                    <span className="font-medium">Best Ranking</span>
                  </div>
                  <div className="text-2xl font-bold">#342</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
