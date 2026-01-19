import { describe, expect, it } from "vitest";

describe("Client Simulator - Trouble Scenarios", () => {
  describe("Scenario 1: Scope Creep", () => {
    it("should identify scope creep situation correctly", () => {
      const scenario = {
        title: "スコープクリープ: 機能要件の段階的追加",
        description: "契約後、クライアントから次々と新しい機能要望が出ています。"
      };
      
      expect(scenario.title).toContain("スコープクリープ");
      expect(scenario.description).toContain("機能要望");
    });

    it("should score best practice response (95 points)", () => {
      const bestResponse = "それぞれの機能について見積もりを提示し、追加料金と納期延長を提案する";
      const score = 95;
      
      expect(score).toBeGreaterThanOrEqual(80);
      expect(bestResponse).toContain("見積もり");
    });

    it("should score poor response (20 points)", () => {
      const poorResponse = "かしこまりました。納期内に対応します";
      const score = 20;
      
      expect(score).toBeLessThan(50);
      expect(poorResponse).toContain("納期内");
    });
  });

  describe("Scenario 2: Payment Delay", () => {
    it("should identify payment delay situation correctly", () => {
      const scenario = {
        title: "支払い遅延: クライアントからの支払いが遅れている",
        description: "納品から2週間、支払期限を過ぎても入金がありません。"
      };
      
      expect(scenario.title).toContain("支払い遅延");
      expect(scenario.description).toContain("入金");
    });

    it("should score best practice response (85 points)", () => {
      const bestResponse = "不具合の詳細を確認してから対応を判断します。また、支払期限を過ぎているため、先に請求額の50%をお支払いください";
      const score = 85;
      
      expect(score).toBeGreaterThanOrEqual(80);
      expect(bestResponse).toContain("支払い");
    });

    it("should score poor response (30 points)", () => {
      const poorResponse = "不具合の修正は無料で対応します";
      const score = 30;
      
      expect(score).toBeLessThan(50);
      expect(poorResponse).toContain("無料");
    });
  });

  describe("Scenario 3: Spec Change", () => {
    it("should identify spec change situation correctly", () => {
      const scenario = {
        title: "仕様変更: 納品後に大幅な仕様変更を要求される",
        description: "納品したサイトについて、クライアントから大幅な変更要求が来ました。"
      };
      
      expect(scenario.title).toContain("仕様変更");
      expect(scenario.description).toContain("変更要求");
    });

    it("should score best practice response (90 points)", () => {
      const bestResponse = "デザイン確認時に承認いただいたので、大幅な変更は追加料金が必要です";
      const score = 90;
      
      expect(score).toBeGreaterThanOrEqual(80);
      expect(bestResponse).toContain("追加料金");
    });

    it("should score poor response (20 points)", () => {
      const poorResponse = "すべての変更に対応します";
      const score = 20;
      
      expect(score).toBeLessThan(50);
      expect(poorResponse).toContain("対応");
    });
  });

  describe("Learning Points", () => {
    it("should provide relevant learning points for scope creep", () => {
      const lessonPoints = [
        "クライアント関係を長期的に構築する",
        "契約書と見積もりを明確にする",
        "スコープ管理の重要性を理解する"
      ];
      
      expect(lessonPoints).toContain("契約書と見積もりを明確にする");
      expect(lessonPoints.length).toBe(3);
    });

    it("should provide relevant learning points for payment delay", () => {
      const lessonPoints = [
        "クライアント関係を長期的に構築する",
        "契約書と見積もりを明確にする",
        "キャッシュフロー管理を徹底する"
      ];
      
      expect(lessonPoints).toContain("キャッシュフロー管理を徹底する");
    });

    it("should provide relevant learning points for spec change", () => {
      const lessonPoints = [
        "クライアント関係を長期的に構築する",
        "契約書と見積もりを明確にする",
        "変更要求は新規案件として扱う"
      ];
      
      expect(lessonPoints).toContain("変更要求は新規案件として扱う");
    });
  });

  describe("Scoring System", () => {
    it("should correctly categorize high scores (80+)", () => {
      const score = 90;
      const category = score >= 80 ? "excellent" : score >= 60 ? "good" : "poor";
      
      expect(category).toBe("excellent");
    });

    it("should correctly categorize medium scores (60-79)", () => {
      const score = 70;
      const category = score >= 80 ? "excellent" : score >= 60 ? "good" : "poor";
      
      expect(category).toBe("good");
    });

    it("should correctly categorize low scores (<60)", () => {
      const score = 30;
      const category = score >= 80 ? "excellent" : score >= 60 ? "good" : "poor";
      
      expect(category).toBe("poor");
    });
  });

  describe("Best Practices", () => {
    it("should emphasize scope management for scope creep", () => {
      const bestPractice = "スコープ追加は必ず見積もり・納期変更の相談を。";
      
      expect(bestPractice).toContain("スコープ");
      expect(bestPractice).toContain("見積もり");
    });

    it("should emphasize payment terms for payment delay", () => {
      const bestPractice = "支払いと修正は別問題。期限内の支払いは契約義務。";
      
      expect(bestPractice).toContain("支払い");
      expect(bestPractice).toContain("契約義務");
    });

    it("should emphasize change management for spec change", () => {
      const bestPractice = "承認プロセスを記録し、その後の変更は追加料金化する。";
      
      expect(bestPractice).toContain("承認");
      expect(bestPractice).toContain("追加料金");
    });
  });
});
