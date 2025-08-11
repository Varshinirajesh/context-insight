import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LinkChecker from "@/components/LinkChecker";
import ProjectBreakdown from "@/components/ProjectBreakdown";
import { Shield, BookOpen } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="checker" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="checker" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Link Checker
            </TabsTrigger>
            <TabsTrigger value="breakdown" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Project Guide
            </TabsTrigger>
          </TabsList>

          <TabsContent value="checker" className="space-y-6">
            <LinkChecker />
          </TabsContent>

          <TabsContent value="breakdown" className="space-y-6">
            <ProjectBreakdown />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
