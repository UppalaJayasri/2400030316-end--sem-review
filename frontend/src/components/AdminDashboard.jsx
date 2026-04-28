import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import {
  Users,
  FileText,
  BarChart3,
  Shield,
  Trash2,
  Edit,
  Plus,
  Crown,
  UserCheck,
  MessageSquare,
  Eye,
  LogOut
} from "lucide-react";
import { toast } from "sonner";
function AdminDashboard({ onLogout }) {
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Heritage Explorer",
      email: "explorer@heritage.com",
      role: "user",
      joinedDate: "2025-01-15",
      quizScore: 8,
      interactions: 5
    },
    {
      id: "2",
      name: "Cultural Expert",
      email: "expert@heritage.com",
      role: "cultural-enthusiast",
      joinedDate: "2025-01-10",
      quizScore: 10,
      interactions: 25
    },
    {
      id: "3",
      name: "History Buff",
      email: "history@heritage.com",
      role: "user",
      joinedDate: "2025-02-01",
      quizScore: 6,
      interactions: 3
    }
  ]);
  const [content, setContent] = useState([
    {
      id: "1",
      title: "Taj Mahal Virtual Tour",
      type: "place",
      status: "published",
      createdBy: "Admin",
      createdDate: "2025-01-20"
    },
    {
      id: "2",
      title: "Mughal Architecture Guide",
      type: "article",
      status: "published",
      createdBy: "Cultural Expert",
      createdDate: "2025-01-25"
    },
    {
      id: "3",
      title: "Heritage Festival 2025",
      type: "event",
      status: "draft",
      createdBy: "Admin",
      createdDate: "2025-02-01"
    }
  ]);
  const [interactions, setInteractions] = useState([
    {
      id: "1",
      userId: "1",
      userName: "Heritage Explorer",
      type: "comment",
      content: "Amazing details about the Taj Mahal! Very informative.",
      date: "2025-02-03",
      status: "approved"
    },
    {
      id: "2",
      userId: "2",
      userName: "Cultural Expert",
      type: "review",
      content: "The architectural analysis is excellent. I would add more about the Pietra Dura technique.",
      date: "2025-02-04",
      status: "pending"
    },
    {
      id: "3",
      userId: "3",
      userName: "History Buff",
      type: "question",
      content: "Are there guided tours available at Red Fort on weekdays?",
      date: "2025-02-05",
      status: "pending"
    }
  ]);
  const [newUserDialog, setNewUserDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map((u) => u.id === userId ? { ...u, role: newRole } : u));
    toast.success(`User role updated to ${newRole.replace("-", " ")}`);
  };
  const handleDeleteUser = (userId) => {
    setUsers(users.filter((u) => u.id !== userId));
    toast.success("User deleted successfully");
  };
  const handleInteractionStatus = (interactionId, status) => {
    setInteractions(interactions.map(
      (i) => i.id === interactionId ? { ...i, status } : i
    ));
    toast.success(`Interaction ${status}`);
  };
  const handleContentStatusChange = (contentId, status) => {
    setContent(content.map(
      (c) => c.id === contentId ? { ...c, status } : c
    ));
    toast.success(`Content ${status}`);
  };
  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return /* @__PURE__ */ jsx(Shield, { className: "w-4 h-4 text-red-600" });
      case "cultural-enthusiast":
        return /* @__PURE__ */ jsx(Crown, { className: "w-4 h-4 text-purple-600" });
      default:
        return /* @__PURE__ */ jsx(UserCheck, { className: "w-4 h-4 text-blue-600" });
    }
  };
  const getRoleBadge = (role) => {
    const colors = {
      admin: "bg-red-100 text-red-800 border-red-300",
      "cultural-enthusiast": "bg-purple-100 text-purple-800 border-purple-300",
      user: "bg-blue-100 text-blue-800 border-blue-300"
    };
    return colors[role] || colors.user;
  };
  const stats = {
    totalUsers: users.length,
    culturalEnthusiasts: users.filter((u) => u.role === "cultural-enthusiast").length,
    totalContent: content.length,
    pendingInteractions: interactions.filter((i) => i.status === "pending").length,
    publishedContent: content.filter((c) => c.status === "published").length,
    averageQuizScore: Math.round(
      users.reduce((sum, u) => sum + (u.quizScore || 0), 0) / users.filter((u) => u.quizScore).length
    )
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(Shield, { className: "w-6 h-6 text-white" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-3xl", children: "Admin Dashboard" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Manage content, users, and interactions" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: onLogout,
            variant: "outline",
            size: "lg",
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" }),
              "Logout & Switch Role"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4", children: [
        /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Total Users" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl", children: stats.totalUsers })
          ] }),
          /* @__PURE__ */ jsx(Users, { className: "w-8 h-8 text-blue-600" })
        ] }) }) }),
        /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Enthusiasts" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl", children: stats.culturalEnthusiasts })
          ] }),
          /* @__PURE__ */ jsx(Crown, { className: "w-8 h-8 text-purple-600" })
        ] }) }) }),
        /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Published" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl", children: stats.publishedContent })
          ] }),
          /* @__PURE__ */ jsx(FileText, { className: "w-8 h-8 text-green-600" })
        ] }) }) }),
        /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Pending" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl", children: stats.pendingInteractions })
          ] }),
          /* @__PURE__ */ jsx(MessageSquare, { className: "w-8 h-8 text-orange-600" })
        ] }) }) }),
        /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Avg Quiz Score" }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl", children: [
              stats.averageQuizScore,
              "/10"
            ] })
          ] }),
          /* @__PURE__ */ jsx(BarChart3, { className: "w-8 h-8 text-indigo-600" })
        ] }) }) }),
        /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Total Content" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl", children: stats.totalContent })
          ] }),
          /* @__PURE__ */ jsx(FileText, { className: "w-8 h-8 text-teal-600" })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "users", className: "w-full", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-3 mb-6", children: [
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "users", className: "gap-2", children: [
          /* @__PURE__ */ jsx(Users, { className: "w-4 h-4" }),
          "User Management"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "content", className: "gap-2", children: [
          /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4" }),
          "Content Management"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "interactions", className: "gap-2", children: [
          /* @__PURE__ */ jsx(MessageSquare, { className: "w-4 h-4" }),
          "User Interactions"
        ] })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "users", children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(CardTitle, { children: "User Management" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Manage user accounts and assign roles" })
          ] }),
          /* @__PURE__ */ jsxs(Dialog, { open: newUserDialog, onOpenChange: setNewUserDialog, children: [
            /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "gap-2", children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
              "Add User"
            ] }) }),
            /* @__PURE__ */ jsxs(DialogContent, { children: [
              /* @__PURE__ */ jsxs(DialogHeader, { children: [
                /* @__PURE__ */ jsx(DialogTitle, { children: "Add New User" }),
                /* @__PURE__ */ jsx(DialogDescription, { children: "Create a new user account" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { children: "Name" }),
                  /* @__PURE__ */ jsx(Input, { placeholder: "Enter name" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { children: "Email" }),
                  /* @__PURE__ */ jsx(Input, { type: "email", placeholder: "Enter email" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { children: "Role" }),
                  /* @__PURE__ */ jsxs(Select, { children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select role" }) }),
                    /* @__PURE__ */ jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsx(SelectItem, { value: "user", children: "User" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "cultural-enthusiast", children: "Cultural Enthusiast" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "admin", children: "Admin" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(Button, { className: "w-full", children: "Create User" })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { children: "User" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Role" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Quiz Score" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Interactions" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Joined" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: users.map((user) => /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { children: user.name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: user.email })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(Badge, { className: `${getRoleBadge(user.role)} border flex items-center gap-1 w-fit`, children: [
              getRoleIcon(user.role),
              user.role.replace("-", " ")
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: user.quizScore ? `${user.quizScore}/10` : "N/A" }),
            /* @__PURE__ */ jsx(TableCell, { children: user.interactions }),
            /* @__PURE__ */ jsx(TableCell, { children: new Date(user.joinedDate).toLocaleDateString() }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxs(
                Select,
                {
                  value: user.role,
                  onValueChange: (value) => handleRoleChange(user.id, value),
                  children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[180px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsx(SelectItem, { value: "user", children: "User" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "cultural-enthusiast", children: "Cultural Enthusiast" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "admin", children: "Admin" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "destructive",
                  size: "sm",
                  onClick: () => handleDeleteUser(user.id),
                  children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                }
              )
            ] }) })
          ] }, user.id)) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "content", children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(CardTitle, { children: "Content Management" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Manage heritage site content and articles" })
          ] }),
          /* @__PURE__ */ jsxs(Button, { className: "gap-2", children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
            "Add Content"
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { children: "Title" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Type" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Created By" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Date" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: content.map((item) => /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: item.title }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", children: item.type }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { className: item.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800", children: item.status }) }),
            /* @__PURE__ */ jsx(TableCell, { children: item.createdBy }),
            /* @__PURE__ */ jsx(TableCell, { children: new Date(item.createdDate).toLocaleDateString() }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", children: /* @__PURE__ */ jsx(Edit, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", children: /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }) }),
              item.status === "draft" ? /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  onClick: () => handleContentStatusChange(item.id, "published"),
                  children: "Publish"
                }
              ) : /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => handleContentStatusChange(item.id, "draft"),
                  children: "Unpublish"
                }
              )
            ] }) })
          ] }, item.id)) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "interactions", children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "User Interactions" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Moderate comments, reviews, and questions" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: interactions.map((interaction) => /* @__PURE__ */ jsx(Card, { className: "border-2", children: /* @__PURE__ */ jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsx("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsx(Badge, { variant: "outline", children: interaction.type }),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: interaction.userName }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: new Date(interaction.date).toLocaleDateString() })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 mb-3", children: interaction.content }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: interaction.status === "pending" ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "sm",
                className: "bg-green-600 hover:bg-green-700",
                onClick: () => handleInteractionStatus(interaction.id, "approved"),
                children: "Approve"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "sm",
                variant: "destructive",
                onClick: () => handleInteractionStatus(interaction.id, "rejected"),
                children: "Reject"
              }
            )
          ] }) : /* @__PURE__ */ jsx(Badge, { className: interaction.status === "approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800", children: interaction.status }) })
        ] }) }) }) }, interaction.id)) }) })
      ] }) })
    ] })
  ] }) });
}
export {
  AdminDashboard
};
