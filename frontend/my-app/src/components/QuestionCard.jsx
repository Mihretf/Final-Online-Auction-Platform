import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MessageCircle, Clock } from "lucide-react";

export function QuestionCard({ question, onViewDetails }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onViewDetails(question.id)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-medium leading-tight">{question.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground gap-1 shrink-0">
            <MessageCircle className="h-4 w-4" />
            {question.answerCount}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {question.description}
        </p>

        {question.tags && question.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {question.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Asked by {question.username}</span>
            <span>•</span>
            <span>{formatDate(question.createdAt)}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(question.id);
            }}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
