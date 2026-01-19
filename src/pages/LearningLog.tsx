import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2 } from "lucide-react";

import { learningLogs } from "@/data/learningLogs";

export default function LearningLog() {
  const [logs] = useState(learningLogs);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border/30 py-8">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">学習ログ</h1>
          <p className="text-muted-foreground">挑戦の軌跡を共有しよう。Build in Public</p>
        </div>
      </div>

      <div className="section-padding">
        <div className="container max-w-4xl">

          {/* Timeline */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">最新の投稿</h2>

            {logs.map(log => (
              <Card key={log.id} className="overflow-hidden border-border/30 hover:border-accent/50 transition-all">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{log.author} • {log.timestamp}</p>
                      <h3 className="text-xl font-bold">{log.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{log.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {log.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
                      <button className="flex items-center gap-2 hover:text-accent transition">
                        <Heart className="h-4 w-4" />
                        {log.likes}
                      </button>
                      <button className="flex items-center gap-2 hover:text-accent transition">
                        <MessageCircle className="h-4 w-4" />
                        {log.comments}
                      </button>
                      <button className="flex items-center gap-2 hover:text-accent transition">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="h-48 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg overflow-hidden">
                    <img src={log.image} alt={log.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
