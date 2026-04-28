import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Crown,
  Award,
  BookOpen,
  MessageSquare,
  Star,
  Trophy,
  Share2,
  Users,
  Calendar,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
function CulturalEnthusiastSection() {
  const [contributions] = useState([
    {
      id: "1",
      title: "Complete Guide to Mughal Architecture",
      type: "guide",
      status: "published",
      likes: 124,
      date: "2025-01-20"
    },
    {
      id: "2",
      title: "Taj Mahal: Beyond the Beauty",
      type: "article",
      status: "published",
      likes: 89,
      date: "2025-01-25"
    },
    {
      id: "3",
      title: "Exploring Hampi Ruins",
      type: "review",
      status: "pending",
      likes: 0,
      date: "2025-02-05"
    }
  ]);
  const [achievements] = useState([
    {
      id: "1",
      title: "Heritage Expert",
      description: "Complete all 10 quiz questions with 100% accuracy",
      icon: Trophy,
      earned: true,
      earnedDate: "2025-01-15"
    },
    {
      id: "2",
      title: "Content Creator",
      description: "Publish 5 articles or guides",
      icon: BookOpen,
      earned: true,
      earnedDate: "2025-01-28"
    },
    {
      id: "3",
      title: "Community Leader",
      description: "Get 100 likes on your contributions",
      icon: Star,
      earned: true,
      earnedDate: "2025-02-01"
    },
    {
      id: "4",
      title: "Site Reviewer",
      description: "Visit and review 10 heritage sites",
      icon: Award,
      earned: false
    },
    {
      id: "5",
      title: "Cultural Ambassador",
      description: "Help 50 users with their questions",
      icon: Users,
      earned: false
    }
  ]);
  const stats = {
    totalContributions: contributions.length,
    publishedContributions: contributions.filter((c) => c.status === "published").length,
    totalLikes: contributions.reduce((sum, c) => sum + c.likes, 0),
    achievementsEarned: achievements.filter((a) => a.earned).length,
    totalAchievements: achievements.length,
    rank: "Gold Contributor"
  };
  const handleSubmitContribution = () => {
    toast.success("Your contribution has been submitted for review!");
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 mb-8 shadow-lg", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Crown, { className: "w-6 h-6" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl mb-0 font-bold", children: "Culture Expert Portal" }),
        /* @__PURE__ */ jsx("p", { className: "text-purple-100 text-[10px]", children: "Share your knowledge and passion for Indian heritage" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 pb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: [
        /* @__PURE__ */ jsx(Card, { className: "bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0", children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-purple-100 text-sm", children: "Rank" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl", children: stats.rank })
          ] }),
          /* @__PURE__ */ jsx(Crown, { className: "w-10 h-10 opacity-80" })
        ] }) }) }),
        /* @__PURE__ */ jsx(Card, { className: "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0", children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-blue-100 text-sm", children: "Contributions" }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl", children: [
              stats.publishedContributions,
              "/",
              stats.totalContributions
            ] })
          ] }),
          /* @__PURE__ */ jsx(BookOpen, { className: "w-10 h-10 opacity-80" })
        ] }) }) }),
        /* @__PURE__ */ jsx(Card, { className: "bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0", children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-orange-100 text-sm", children: "Total Likes" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl", children: stats.totalLikes })
          ] }),
          /* @__PURE__ */ jsx(Star, { className: "w-10 h-10 opacity-80" })
        ] }) }) }),
        /* @__PURE__ */ jsx(Card, { className: "bg-gradient-to-br from-green-500 to-green-600 text-white border-0", children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-green-100 text-sm", children: "Achievements" }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl", children: [
              stats.achievementsEarned,
              "/",
              stats.totalAchievements
            ] })
          ] }),
          /* @__PURE__ */ jsx(Trophy, { className: "w-10 h-10 opacity-80" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs(Tabs, { defaultValue: "contribute", className: "w-full", children: [
        /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-3 mb-6", children: [
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "contribute", className: "gap-2", children: [
            /* @__PURE__ */ jsx(Share2, { className: "w-4 h-4" }),
            "Contribute"
          ] }),
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "my-content", className: "gap-2", children: [
            /* @__PURE__ */ jsx(BookOpen, { className: "w-4 h-4" }),
            "My Content"
          ] }),
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "achievements", className: "gap-2", children: [
            /* @__PURE__ */ jsx(Trophy, { className: "w-4 h-4" }),
            "Achievements"
          ] })
        ] }),
        /* @__PURE__ */ jsxs(TabsContent, { value: "contribute", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs(Card, { className: "border-2 border-purple-500 bg-white shadow-lg", children: [
              /* @__PURE__ */ jsxs(CardHeader, { children: [
                /* @__PURE__ */ jsx(CardTitle, { children: "Submit an Article" }),
                /* @__PURE__ */ jsx(CardDescription, { children: "Share your knowledge about heritage sites" })
              ] }),
              /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { children: "Article Title" }),
                  /* @__PURE__ */ jsx(Input, { placeholder: "Enter article title" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { children: "Category" }),
                  /* @__PURE__ */ jsx(Input, { placeholder: "e.g., Architecture, History, Culture" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { children: "Content" }),
                  /* @__PURE__ */ jsx(
                    Textarea,
                    {
                      placeholder: "Write your article content here...",
                      className: "min-h-[200px]"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs(Button, { className: "w-full gap-2", onClick: handleSubmitContribution, children: [
                  /* @__PURE__ */ jsx(Share2, { className: "w-4 h-4" }),
                  "Submit Article"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(Card, { className: "border-2 border-pink-500 bg-white shadow-lg", children: [
              /* @__PURE__ */ jsxs(CardHeader, { children: [
                /* @__PURE__ */ jsx(CardTitle, { children: "Write a Review" }),
                /* @__PURE__ */ jsx(CardDescription, { children: "Share your experience visiting a heritage site" })
              ] }),
              /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { children: "Heritage Site" }),
                  /* @__PURE__ */ jsx(Input, { placeholder: "Select or type site name" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { children: "Rating" }),
                  /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", children: /* @__PURE__ */ jsx(Star, { className: "w-4 h-4" }) }, star)) })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { children: "Your Review" }),
                  /* @__PURE__ */ jsx(
                    Textarea,
                    {
                      placeholder: "Share your experience...",
                      className: "min-h-[150px]"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs(Button, { className: "w-full gap-2", onClick: handleSubmitContribution, children: [
                  /* @__PURE__ */ jsx(MessageSquare, { className: "w-4 h-4" }),
                  "Submit Review"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200", children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(BookOpen, { className: "w-5 h-5" }),
              "Contribution Guidelines"
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-700", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" }),
                /* @__PURE__ */ jsx("span", { children: "Ensure all information is accurate and well-researched" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" }),
                /* @__PURE__ */ jsx("span", { children: "Include historical facts, architectural details, and cultural significance" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" }),
                /* @__PURE__ */ jsx("span", { children: "Add personal insights and unique perspectives from your visits" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" }),
                /* @__PURE__ */ jsx("span", { children: "Maintain respectful and educational tone throughout" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" }),
                /* @__PURE__ */ jsx("span", { children: "All submissions are reviewed by admins before publication" })
              ] })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(TabsContent, { value: "my-content", children: /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { children: "Your Contributions" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Track your published articles, reviews, and guides" })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: contributions.map((contribution) => /* @__PURE__ */ jsx(Card, { className: "border-2 border-amber-500", children: /* @__PURE__ */ jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsx("h4", { children: contribution.title }),
                /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "capitalize", children: contribution.type })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-sm text-gray-600", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
                  new Date(contribution.date).toLocaleDateString()
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 fill-yellow-400 text-yellow-400" }),
                  contribution.likes,
                  " likes"
                ] }),
                /* @__PURE__ */ jsx(Badge, { className: contribution.status === "published" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800", children: contribution.status })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", children: "View" }),
              /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", children: "Edit" })
            ] })
          ] }) }) }, contribution.id)) }) })
        ] }) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "achievements", children: /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { children: "Your Achievements" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Unlock badges by contributing to the community" })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: achievements.map((achievement) => {
            const Icon = achievement.icon;
            return /* @__PURE__ */ jsx(
              Card,
              {
                className: `${achievement.earned ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400" : "bg-gray-50 opacity-60"}`,
                children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
                  /* @__PURE__ */ jsx("div", { className: `w-16 h-16 rounded-full flex items-center justify-center mb-4 ${achievement.earned ? "bg-gradient-to-br from-yellow-400 to-orange-500" : "bg-gray-300"}`, children: /* @__PURE__ */ jsx(Icon, { className: "w-8 h-8 text-white" }) }),
                  /* @__PURE__ */ jsx("h4", { className: "mb-2", children: achievement.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-3", children: achievement.description }),
                  achievement.earned ? /* @__PURE__ */ jsxs(Badge, { className: "bg-green-600", children: [
                    /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3 h-3 mr-1" }),
                    "Earned ",
                    achievement.earnedDate && new Date(achievement.earnedDate).toLocaleDateString()
                  ] }) : /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Locked" })
                ] }) })
              },
              achievement.id
            );
          }) }) })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  CulturalEnthusiastSection
};
