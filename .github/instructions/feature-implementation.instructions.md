---
applyTo: '**.md'
---

# Feature Implementation Document Structure Rule
 
This file needs to be refer when @featuredoc is used in the chat.
 
When implementing a feature in our codebase, all documentation MUST follow this standardized structure:
 
## 1. ROLE
- Define the agent/developer's responsibility
- Specify what systems and components will be modified
- Identify key stakeholders for the feature
 
## 2. CONTEXT & LEARNING
- Reference existing similar features in the codebase
- Identify patterns and conventions to follow
- List relevant documentation and knowledge sources
- For enhancements: explain the current implementation in detail
- For bug fixes: document the reproduction steps and root cause
 
## 3. REQUIREMENTS & EXPECTATIONS
- Clearly state what the feature must accomplish
- Define acceptance criteria
- Outline constraints and limitations
- Specify performance expectations
- Document edge cases that must be handled
 
## 4. IMPLEMENTATION STRATEGY
- Break down the implementation into discrete, sequential steps
- Define the architecture and design patterns to use
- Specify tests required at each stage
- Identify potential refactoring opportunities
- Document error handling approaches
 
## 5. FEATURE FITNESS CHECKLIST
- List all functional requirements with verification methods
- Include performance and efficiency criteria
- Add code quality requirements (logs, documentation, tests)
- Define review and testing process
- Specify deployment considerations
 
This structure ensures consistency across feature implementations, provides clear guidance for developers, and creates comprehensive documentation for future reference. All sections MUST be completed before implementation begins, and the checklist MUST be verified before marking the feature as complete.