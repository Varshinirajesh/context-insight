import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Shield, AlertTriangle, CheckCircle, XCircle, Globe, Eye, Clock, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScanResult {
  score: number;
  label: 'safe' | 'warning' | 'danger';
  reasons: string[];
  metadata?: {
    domain: string;
    scanTime: string;
    lastSeen?: string;
  };
}

const LinkChecker = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const { toast } = useToast();

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return "text-safe";
    if (score >= 60) return "text-warning";
    return "text-danger";
  };

  const getScoreIcon = (label: string) => {
    switch (label) {
      case 'safe':
        return <CheckCircle className="h-5 w-5 text-safe" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'danger':
        return <XCircle className="h-5 w-5 text-danger" />;
      default:
        return <Shield className="h-5 w-5" />;
    }
  };

  const mockScan = async (url: string): Promise<ScanResult> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock different results based on URL
    const domain = new URL(url).hostname;
    const suspicious = ['suspicious', 'malware', 'phishing', 'scam'].some(word => 
      url.toLowerCase().includes(word)
    );
    
    if (suspicious) {
      return {
        score: Math.floor(Math.random() * 30) + 10,
        label: 'danger',
        reasons: [
          'Suspicious domain pattern detected',
          'No SSL certificate found',
          'Domain registered recently',
          'Matches known phishing patterns'
        ],
        metadata: {
          domain,
          scanTime: new Date().toLocaleTimeString(),
          lastSeen: '2 days ago'
        }
      };
    }
    
    const isWarning = Math.random() > 0.7;
    if (isWarning) {
      return {
        score: Math.floor(Math.random() * 20) + 60,
        label: 'warning',
        reasons: [
          'Domain has mixed reputation',
          'Some security flags detected',
          'Limited trust signals'
        ],
        metadata: {
          domain,
          scanTime: new Date().toLocaleTimeString()
        }
      };
    }
    
    return {
      score: Math.floor(Math.random() * 20) + 80,
      label: 'safe',
      reasons: [
        'Valid SSL certificate',
        'Clean security record',
        'Trusted domain reputation',
        'No malware detected'
      ],
      metadata: {
        domain,
        scanTime: new Date().toLocaleTimeString()
      }
    };
  };

  const handleScan = async () => {
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a URL to check.",
        variant: "destructive",
      });
      return;
    }

    if (!validateUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const scanResult = await mockScan(url);
      setResult(scanResult);
      
      toast({
        title: "Scan Complete",
        description: `Security score: ${scanResult.score}/100`,
      });
    } catch (error) {
      toast({
        title: "Scan Failed",
        description: "Unable to analyze the URL. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Link Safety Checker
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Analyze any URL for security threats, malware, phishing attempts, and other risks. 
          Get detailed insights and safety recommendations.
        </p>
      </div>

      {/* Input Section */}
      <Card className="border-2 border-border/50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            URL Analysis
          </CardTitle>
          <CardDescription>
            Enter a URL to check its safety and security status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleScan()}
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={handleScan} 
              disabled={isLoading}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Check URL
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getScoreIcon(result.label)}
                Security Analysis Results
              </div>
              <Badge 
                variant={result.label === 'safe' ? 'default' : 'destructive'}
                className={`text-lg px-4 py-1 ${
                  result.label === 'safe' ? 'bg-safe text-safe-foreground' : 
                  result.label === 'warning' ? 'bg-warning text-warning-foreground' :
                  'bg-danger text-danger-foreground'
                }`}
              >
                {result.score}/100
              </Badge>
            </CardTitle>
            {result.metadata && (
              <CardDescription className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  {result.metadata.domain}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Scanned at {result.metadata.scanTime}
                </span>
                {result.metadata.lastSeen && (
                  <span className="flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" />
                    Last seen: {result.metadata.lastSeen}
                  </span>
                )}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Score Visualization */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Safety Score</span>
                <span className={`font-bold text-lg ${getScoreColor(result.score)}`}>
                  {result.score}/100
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    result.label === 'safe' ? 'bg-gradient-to-r from-safe to-safe/80' :
                    result.label === 'warning' ? 'bg-gradient-to-r from-warning to-warning/80' :
                    'bg-gradient-to-r from-danger to-danger/80'
                  }`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
            </div>

            {/* Analysis Details */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Analysis Details
              </h4>
              <div className="space-y-2">
                {result.reasons.map((reason, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 border border-border/30"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      result.label === 'safe' ? 'bg-safe' :
                      result.label === 'warning' ? 'bg-warning' : 'bg-danger'
                    }`} />
                    <span className="text-sm">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation */}
            <div className={`p-4 rounded-lg border-l-4 ${
              result.label === 'safe' ? 'bg-safe/5 border-safe text-safe-foreground' :
              result.label === 'warning' ? 'bg-warning/5 border-warning text-warning-foreground' :
              'bg-danger/5 border-danger text-danger-foreground'
            }`}>
              <p className="font-medium mb-1">
                {result.label === 'safe' ? '✓ Safe to Visit' :
                 result.label === 'warning' ? '⚠ Proceed with Caution' :
                 '⚠ Not Recommended'}
              </p>
              <p className="text-sm opacity-90">
                {result.label === 'safe' 
                  ? 'This URL appears to be safe based on our analysis.'
                  : result.label === 'warning'
                  ? 'Some potential risks detected. Exercise caution when visiting.'
                  : 'This URL shows signs of potential security threats. We recommend avoiding it.'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LinkChecker;