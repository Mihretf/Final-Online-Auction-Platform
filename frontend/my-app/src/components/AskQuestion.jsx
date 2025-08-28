import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ArrowLeft } from "lucide-react";

export function AskQuestion({ currentUser, onBack, onQuestionSubmitted }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    console.log("Submitting question:", formData);
    
    // Reset form and navigate back
    setFormData({ title: "", description: "", tags: "" });
    onQuestionSubmitted();
  };

  const isFormValid = formData.title.trim() && formData.description.trim();

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Questions
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Ask a Question</CardTitle>
          <p className="text-muted-foreground">
            Share your question with the Evangadi community and get help from developers around the world.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Question Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="What's your programming question? Be specific."
                value={formData.title}
                onChange={handleChange}
                required
              />
              <p className="text-sm text-muted-foreground">
                Write a clear, descriptive title that summarizes your question.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Question Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide more details about your question. Include what you've tried, error messages, code snippets, etc."
                value={formData.description}
                onChange={handleChange}
                className="min-h-40"
                required
              />
              <p className="text-sm text-muted-foreground">
                Explain your question in detail. Include any relevant code, error messages, and what you've already tried.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (optional)</Label>
              <Input
                id="tags"
                name="tags"
                placeholder="e.g., react, javascript, api (separate with commas)"
                value={formData.tags}
                onChange={handleChange}
              />
              <p className="text-sm text-muted-foreground">
                Add up to 5 tags to help others find your question. Separate tags with commas.
              </p>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Tips for writing a good question:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Be specific and clear in your title</li>
                <li>• Include relevant code snippets or error messages</li>
                <li>• Explain what you've already tried</li>
                <li>• Use proper formatting for code blocks</li>
                <li>• Add relevant tags to help categorize your question</li>
              </ul>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={!isFormValid} className="flex-1">
                Submit Question
              </Button>
              <Button type="button" variant="outline" onClick={onBack}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
