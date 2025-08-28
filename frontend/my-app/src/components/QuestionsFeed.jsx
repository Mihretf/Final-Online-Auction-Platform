import { QuestionCard } from "./QuestionCard";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export function QuestionsFeed({ onViewQuestion }) {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data - in a real app this would come from API/database
  const questions = [
    {
      id: "1",
      title: "How to implement authentication in React with JWT tokens?",
      description: "I'm building a React application and need to implement user authentication using JWT tokens. What's the best approach for storing tokens securely and handling token refresh?",
      username: "john_dev",
      createdAt: "2024-01-20",
      answerCount: 5,
      tags: ["React", "Authentication", "JWT"]
    },
    {
      id: "2", 
      title: "Best practices for Node.js REST API design?",
      description: "I'm designing a REST API using Node.js and Express. What are the current best practices for structuring routes, handling errors, and organizing middleware?",
      username: "sarah_backend",
      createdAt: "2024-01-19",
      answerCount: 3,
      tags: ["Node.js", "REST API", "Express"]
    },
    {
      id: "3",
      title: "How to optimize database queries in MongoDB?",
      description: "My MongoDB queries are running slowly with large datasets. What are some strategies to optimize query performance and improve response times?",
      username: "mike_dba",
      createdAt: "2024-01-18",
      answerCount: 8,
      tags: ["MongoDB", "Database", "Performance"]
    },
    {
      id: "4",
      title: "CSS Grid vs Flexbox - When to use which?",
      description: "I often get confused about when to use CSS Grid versus Flexbox for layouts. Can someone explain the differences and provide examples of when each is most appropriate?",
      username: "lisa_designer",
      createdAt: "2024-01-17",
      answerCount: 12,
      tags: ["CSS", "Layout", "Frontend"]
    },
    {
      id: "5",
      title: "Docker container deployment best practices",
      description: "What are the security and performance best practices when deploying Docker containers to production? I'm particularly interested in image optimization and secrets management.",
      username: "alex_devops",
      createdAt: "2024-01-16",
      answerCount: 6,
      tags: ["Docker", "DevOps", "Security"]
    }
  ];

  const filteredQuestions = questions.filter(question =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2">Questions</h1>
        <p className="text-muted-foreground mb-6">
          Find answers to your questions or help others by sharing your knowledge
        </p>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search questions..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onViewDetails={onViewQuestion}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No questions found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}