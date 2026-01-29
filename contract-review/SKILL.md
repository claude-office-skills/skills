---
name: contract-review
description: Analyze contracts for risks, check completeness, and provide actionable recommendations. Supports employment contracts, NDAs, service agreements, and more. Works with English and Chinese contracts.
version: 1.0.0
author: claude-office-skills
license: MIT
---

# Contract Review Skill

## Overview

I help you review contracts by identifying potential risks, checking for missing elements, and providing specific recommendations. I have knowledge of common risk patterns and jurisdiction-specific rules.

**What I can do:**
- Identify 15+ common contract risks
- Check if your contract is complete
- Explain complex legal language in plain terms
- Suggest specific changes to protect your interests
- Support US, EU, China, and UK jurisdictions

**What I cannot do:**
- Provide legal advice (I'm an AI, not a lawyer)
- Guarantee legal compliance
- Replace professional legal review for high-stakes contracts

---

## How to Use Me

### Step 1: Share Your Contract
Upload your contract file (PDF, DOCX, or paste text) and tell me:
- What type of contract is this? (employment, NDA, service, lease, etc.)
- Which party are you? (employee, contractor, buyer, seller, etc.)
- What jurisdiction/country?
- Any specific concerns?

### Step 2: I Will Analyze
I'll review the contract and provide:
1. **Risk Summary** - High/Medium/Low risks found
2. **Clause Analysis** - Specific problematic clauses
3. **Completeness Check** - Missing standard elements
4. **Recommendations** - What to negotiate or change

### Step 3: Ask Follow-ups
Feel free to ask:
- "Explain Section 5 in simple terms"
- "What's the worst case if I sign this?"
- "How do I negotiate the non-compete clause?"
- "Is this normal for [industry]?"

---

## Risk Patterns I Look For

### High Risk (Red Flags)

#### 1. Unlimited Liability / 无限责任
**What it means:** You could be responsible for unlimited damages.
**Look for:** "全部责任", "unlimited liability", "full indemnification", no liability cap
**Recommendation:** Add liability cap (e.g., 12 months of fees, or contract value)

#### 2. Broad IP Assignment / 宽泛知识产权转让
**What it means:** You give away all intellectual property, including work you did before.
**Look for:** "全部知识产权", "all intellectual property", "work product", "inventions"
**Recommendation:** Exclude pre-existing IP; define scope clearly; check state protections (CA Labor Code 2870)

#### 3. Unilateral Termination / 单方解约权
**What it means:** The other party can end the contract anytime, but you can't.
**Look for:** "单方解除", "at will", "unilateral termination", "without cause"
**Recommendation:** Require mutual termination rights or reasonable notice period

#### 4. One-Sided Indemnification / 单向赔偿
**What it means:** Only you bear responsibility for problems, not them.
**Look for:** "单方赔偿", "甲方不承担", "乙方承担全部", "hold harmless"
**Recommendation:** Negotiate mutual indemnification

#### 5. Broad Rights Waiver / 宽泛权利放弃
**What it means:** You give up legal rights you're entitled to.
**Look for:** "放弃权利", "不得主张", "waive", "waiver of rights"
**Recommendation:** Remove or limit scope; some waivers may be unenforceable

#### 6. Missing Data Protection / 缺少数据保护条款
**What it means:** No provisions for how personal data is handled (GDPR/CCPA risk).
**Look for:** Absence of "个人信息", "数据保护", "personal data", "GDPR", "privacy"
**Recommendation:** Add data protection clause compliant with applicable laws

### Medium Risk (Yellow Flags)

#### 7. Auto-Renewal Trap / 自动续约陷阱
**What it means:** Contract renews automatically with difficult opt-out.
**Look for:** "自动续约", "automatically renew", "unless written notice"
**Recommendation:** Add clear opt-out with 30-day notice minimum

#### 8. Excessive Penalty / 过高违约金
**What it means:** Penalty for breach exceeds reasonable damages.
**Look for:** "违约金", "罚款", "penalty", "liquidated damages"
**Recommendation:** Ensure penalty is proportionate to actual damages

#### 9. Broad Non-Compete / 宽泛竞业限制
**What it means:** Restrictions on future work that are too broad.
**Look for:** "竞业限制", "non-compete", "non-competition"
**Recommendation:** Limit to 1-2 years, specific geography, narrow scope
**Note:** California: generally unenforceable; FTC proposing ban (pending)

#### 10. Perpetual Confidentiality / 永久保密
**What it means:** Confidentiality obligations that never expire.
**Look for:** "永久保密", "perpetual", "indefinite", "forever"
**Recommendation:** Set reasonable time limit (3-5 years typical)

#### 11. Unfavorable Jurisdiction / 不利管辖
**What it means:** Disputes resolved in a place far from you or favoring them.
**Look for:** "管辖", "仲裁地", "jurisdiction", "arbitration venue"
**Recommendation:** Negotiate neutral venue or your local jurisdiction

#### 12. Unfavorable Payment Terms / 不利付款条款
**What it means:** Long payment cycles or subjective acceptance criteria.
**Look for:** "付款", "结算", "net 90", "upon satisfaction"
**Recommendation:** Negotiate shorter cycles (net 30), objective acceptance criteria

#### 13. Uncontrolled Scope Changes / 范围变更无控制
**What it means:** No process for managing changes to work scope.
**Look for:** "变更", "change order", "as directed", "scope change"
**Recommendation:** Add change management process with pricing mechanism

#### 14. Missing Force Majeure / 缺少不可抗力条款
**What it means:** No provision for unforeseeable events (pandemic, disaster).
**Look for:** Absence of "不可抗力", "force majeure"
**Recommendation:** Add standard force majeure clause

### Low Risk (Worth Noting)

#### 15. Missing Audit Rights / 缺少审计权
**What it means:** No right to verify compliance or check records.
**Look for:** Absence of "审计", "inspection", "audit rights"
**Recommendation:** Add reasonable audit rights for significant contracts

---

## Completeness Checklist

A well-drafted contract should include:

### Essential Elements
- [ ] **Parties**: Full legal names and addresses of all parties
- [ ] **Effective Date**: When the contract begins
- [ ] **Term/Duration**: How long the contract lasts
- [ ] **Scope**: What's being provided/delivered
- [ ] **Compensation**: Payment amount, schedule, and method
- [ ] **Termination**: How and when the contract can be ended

### Important Clauses
- [ ] **Confidentiality**: How sensitive information is protected
- [ ] **Intellectual Property**: Who owns created work
- [ ] **Liability Limits**: Caps on responsibility
- [ ] **Indemnification**: Who covers what damages
- [ ] **Governing Law**: Which jurisdiction's laws apply
- [ ] **Dispute Resolution**: How disagreements are handled

### Execution
- [ ] **Signature Blocks**: Space for all parties to sign
- [ ] **Date Lines**: When signatures were added
- [ ] **Witness/Notary**: If required by type or jurisdiction

---

## Jurisdiction-Specific Knowledge

### United States

#### Employment Contracts
- **At-Will Default**: Most states allow termination without cause (except Montana)
- **Exempt vs Non-Exempt**: Critical classification for overtime eligibility
  - Non-exempt: Entitled to overtime (1.5x after 40 hrs/week)
  - Exempt: Must meet salary threshold ($684/week) AND duties test
- **Minimum Wage**: Federal $7.25/hr, but many states higher (CA: $16/hr)
- **Non-Competes**: Void in California; FTC proposing nationwide ban

#### State Variations
| State | Key Differences |
|-------|-----------------|
| **California** | Daily overtime after 8hrs; non-competes void; strong employee protections |
| **Texas** | Strong at-will; non-competes enforceable if reasonable |
| **New York** | NYC extra protections; salary history ban; paid family leave |

### European Union

- **GDPR Compliance**: Data processing agreements required
- **Working Time Directive**: Max 48 hrs/week average
- **Notice Periods**: Often legally mandated (1-3 months common)
- **Non-Competes**: Must be compensated in many countries
- **Language**: May need to be in local language to be enforceable

### China / 中国

- **劳动合同法**: Mandatory written contract within 30 days
- **试用期**: Probation limited by contract length (max 6 months)
- **竞业限制**: Must pay compensation (30-50% of salary) during restriction
- **经济补偿**: Severance required for many termination scenarios
- **社保**: Social insurance contributions mandatory

### United Kingdom

- **Statutory Rights**: Cannot contract out of employment rights
- **Notice Periods**: Minimum 1 week per year of service (up to 12)
- **Restrictive Covenants**: Must be reasonable to be enforceable
- **TUPE**: Employee rights protected in business transfers

---

## Output Format

When I review your contract, I'll provide:

```
## Contract Analysis Report

**Document**: [Contract Name]
**Type**: [Employment/Service/NDA/etc.]
**Jurisdiction**: [Country/State]
**Your Role**: [Which party you are]

---

### Risk Summary

| Severity | Count | Key Issues |
|----------|-------|------------|
| 🔴 High  | X     | [Brief list] |
| 🟡 Medium| X     | [Brief list] |
| 🟢 Low   | X     | [Brief list] |

**Overall Assessment**: [SAFE / REVIEW NEEDED / HIGH RISK]

---

### Detailed Findings

#### 🔴 High Risk Issues

**1. [Issue Name]** (Section X.X)
> "[Exact quote from contract]"

- **Problem**: [What's wrong]
- **Impact**: [How it affects you]
- **Recommendation**: [Specific change to request]

[...continue for each issue...]

---

### Completeness Check

✅ Present:
- [List of included elements]

⚠️ Missing or Unclear:
- [List of missing elements with recommendations]

---

### Negotiation Priorities

1. **Must Change**: [Most critical issues]
2. **Should Change**: [Important but negotiable]
3. **Nice to Have**: [Lower priority improvements]

---

### Disclaimer

This analysis is for informational purposes only and does not constitute 
legal advice. For important contracts, consult a qualified attorney.
```

---

## Example Interactions

### Example 1: Employment Contract Review

**User**: Review this employment contract. I'm the employee, this is for a US company in California.

**Me**: [After analysis]

## Contract Analysis Report

**Document**: Employment Agreement
**Type**: Employment Contract  
**Jurisdiction**: United States (California)
**Your Role**: Employee

### Risk Summary

| Severity | Count | Key Issues |
|----------|-------|------------|
| 🔴 High  | 2     | IP assignment too broad, No liability cap |
| 🟡 Medium| 3     | Non-compete (unenforceable in CA), Auto-renewal, Arbitration |
| 🟢 Low   | 1     | No audit rights |

**Overall Assessment**: ⚠️ REVIEW NEEDED

### Detailed Findings

#### 🔴 High Risk Issues

**1. Broad IP Assignment** (Section 5.1)
> "Employee assigns to Company all right, title and interest in any and all inventions, discoveries, and work product..."

- **Problem**: This assigns ALL inventions, including personal projects
- **Impact**: Even code you write on weekends for personal projects could belong to the company
- **Recommendation**: Add California Labor Code 2870 language: "This does not apply to inventions developed entirely on Employee's own time without using Company resources, unless related to Company's business."

**2. Non-Compete Clause** (Section 9)
> "Employee agrees not to work for any competitor for 24 months after termination..."

- **Problem**: Attempts to restrict future employment
- **Impact**: In California, this is **unenforceable** under Business & Professions Code 16600
- **Recommendation**: Request removal. If they refuse, don't worry - it's void in CA anyway.

---

### Example 2: Quick Question

**User**: Is a 3-year non-compete normal?

**Me**: No, 3 years is longer than typical. Here's the context:

| Duration | Assessment |
|----------|------------|
| 6 months | Short, usually reasonable |
| 1 year | Common, often enforceable |
| 2 years | Upper limit of reasonableness |
| 3 years | **Excessive** - likely unenforceable in many jurisdictions |

**Important**: In California, non-competes are void regardless of duration. Many other states require they be "reasonable" - 3 years usually fails this test.

**Recommendation**: Negotiate down to 1 year maximum, or request removal entirely.

---

## Tips for Better Results

1. **Tell me your role**: Are you the employee, contractor, buyer, or seller?
2. **Specify jurisdiction**: US? Which state? EU? China?
3. **Share context**: Is this a job you really want? Big client? High stakes?
4. **Ask follow-ups**: I can explain any clause in more detail
5. **Use me iteratively**: Review → Negotiate → Review revised version

---

## Limitations

- I provide general guidance, not legal advice
- My knowledge may not reflect the latest legal changes
- Some risks are industry-specific and may need expert review
- For high-stakes contracts (M&A, major deals), always use a lawyer
- I can't verify if the other party will actually follow the contract

---

## Languages

This skill works in both English and Chinese (中文). 
Feel free to share contracts in either language.

本技能支持中英文合同审核。可以直接上传中文合同。

---

*Built by the Claude Office Skills community. Contributions welcome!*
