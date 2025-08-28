import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, MessageCircle, HelpCircle } from "lucide-react";

export function Profile({ user, onBack }) {
  // Mock user activity data
  const userStats = {
    questionsAsked: 12,
    answersProvided: 28,
    reputation: 145
  };

  const recentQuestions = [
    {
      id: "1",
      title: "How to implement authentication in React with JWT tokens?",
      createdAt: "2024-01-20",
      answerCount: 5
    },
    {
      id: "2",
      title: "Best practices for Node.js REST API design?",
      createdAt: "2024-01-18",
      answerCount: 3
    }
  ];

  const recentAnswers = [
    {
      id: "1",
      questionTitle: "CSS Grid vs Flexbox - When to use which?",
      createdAt: "2024-01-19"
    },
    {
      id: "2",
      questionTitle: "Docker container deployment best practices",
      createdAt: "2024-01-17"
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Questions
      </Button>

      <div className="grid gap-8 md:grid-cols-3">
        {/* User Info */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">{user.username}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                {user.firstName && user.lastName && (
                  <p className="text-sm text-muted-foreground">
                    {user.firstName} {user.lastName}
                  </p>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Questions Asked</span>
                  <Badge variant="secondary">{userStats.questionsAsked}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Answers Provided</span>
                  <Badge variant="secondary">{userStats.answersProvided}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Reputation</span>
                  <Badge>{userStats.reputation}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity */}
        <div className="md:col-span-2 space-y-8">
          {/* Recent Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                My Recent Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentQuestions.length > 0 ? (
                <div className="space-y-4">
                  {recentQuestions.map((question) => (
                    <div key={question.id} className="border-l-2 border-primary pl-4">
                      <h4 className="font-medium mb-1">{question.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Asked on {formatDate(question.createdAt)}</span>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {question.answerCount} answers
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No questions asked yet.</p>
              )}
            </CardContent>
          </Card>

          {/* Recent Answers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                My Recent Answers
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentAnswers.length > 0 ? (
                <div className="space-y-4">
                  {recentAnswers.map((answer) => (
                    <div key={answer.id} className="border-l-2 border-green-500 pl-4">
                      <h4 className="font-medium mb-1">{answer.questionTitle}</h4>
                      <p className="text-sm text-muted-foreground">
                        Answered on {formatDate(answer.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No answers provided yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
