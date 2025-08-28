import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { ArrowLeft, Clock, MessageCircle } from "lucide-react";
import { Separator } from "./ui/separator";

export function QuestionDetails({ questionId, currentUser, onBack }) {
  const [newAnswer, setNewAnswer] = useState("");

  // Mock data - in real app would fetch from API
  const question = {
    id: questionId,
    title: "How to implement authentication in React with JWT tokens?",
    content: "I'm building a React application and need to implement user authentication using JWT tokens. What's the best approach for storing tokens securely and handling token refresh?\n\nI've heard different opinions about storing tokens in localStorage vs httpOnly cookies. I'm also unsure about how to handle token expiration and refresh tokens properly.\n\nAny guidance would be appreciated!",
    username: "john_dev",
    createdAt: "2024-01-20",
    tags: ["React", "Authentication", "JWT"]
  };

  const [answers, setAnswers] = useState([
    {
      id: "1",
      content: "For JWT token storage, I recommend using httpOnly cookies instead of localStorage for better security. LocalStorage is vulnerable to XSS attacks. Here's a basic approach:\n\n1. Store access tokens in httpOnly cookies\n2. Use refresh tokens for token renewal\n3. Implement proper CSRF protection\n\nMake sure to set appropriate cookie flags like Secure and SameSite.",
      username: "security_expert",
      createdAt: "2024-01-20"
    },
    {
      id: "2", 
      content: "I've implemented JWT auth in several React apps. Here's what worked well for me:\n\n```javascript\n// Use axios interceptors for automatic token refresh\naxios.interceptors.response.use(\n  (response) => response,\n  async (error) => {\n    if (error.response?.status === 401) {\n      // Handle token refresh\n      await refreshToken();\n      return axios.request(error.config);\n    }\n    return Promise.reject(error);\n  }\n);\n```\n\nThis automatically handles token refresh when you get 401 responses.",
      username: "react_pro",
      createdAt: "2024-01-20"
    }
  ]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSubmitAnswer = () => {
    if (newAnswer.trim()) {
      const answer = {
        id: Date.now().toString(),
        content: newAnswer,
        username: currentUser.username,
        createdAt: new Date().toISOString()
      };
      setAnswers(prev => [...prev, answer]);
      setNewAnswer("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Questions
      </Button>

      {/* Question */}
      <Card className="mb-8">
        <CardHeader>
          <h1 className="text-2xl font-medium mb-4">{question.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Asked by {question.username} on {formatDate(question.createdAt)}
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              {answers.length} answers
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none mb-4">
            {question.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-3 last:mb-0">{paragraph}</p>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {question.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Answers */}
      <div className="mb-8">
        <h2 className="text-xl font-medium mb-6">
          {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
        </h2>
        
        <div className="space-y-6">
          {answers.map((answer, index) => (
            <div key={answer.id}>
              <Card>
                <CardContent className="pt-6">
                  <div className="prose max-w-none mb-4">
                    {answer.content.split('\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="mb-3 last:mb-0">{paragraph}</p>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Answered by {answer.username}</span>
                    <span>{formatDate(answer.createdAt)}</span>
                  </div>
                </CardContent>
              </Card>
              {index < answers.length - 1 && <Separator className="my-6" />}
            </div>
          ))}
        </div>
      </div>

      {/* Answer Form */}
      <Card>
        <CardHeader>
          <h3 className="font-medium">Post Your Answer</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Share your knowledge and help the community..."
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="min-h-32"
          />
          <Button onClick={handleSubmitAnswer} disabled={!newAnswer.trim()}>
            Post Answer
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}