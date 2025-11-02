"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface ScenarioComparisonProps {
  scenarios: any[];
  onClose: () => void;
  onDelete: (id: number) => void;
}

export function ScenarioComparison({ scenarios, onClose, onDelete }: ScenarioComparisonProps) {
  if (!scenarios.length) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Compare Scenarios</h2>
          <Button onClick={onClose} variant="ghost" size="icon">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scenarios.map((scenario) => (
            <Card key={scenario.id} className="relative">
              <Button
                onClick={() => onDelete(scenario.id)}
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
              <CardHeader>
                <CardTitle className="text-lg">{scenario.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{scenario.timestamp}</p>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cash:</span>
                  <span className="font-semibold">{formatCurrency(scenario.cash)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Revenue:</span>
                  <span className="font-semibold">{formatCurrency(scenario.revenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expenses:</span>
                  <span className="font-semibold">{formatCurrency(scenario.expenses)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-muted-foreground">Runway:</span>
                  <span className="font-bold text-primary">
                    {scenario.runway === Infinity ? '∞' : `${scenario.runway.toFixed(1)}m`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Burn:</span>
                  <span className="font-semibold">{formatCurrency(Math.abs(scenario.burn))}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
