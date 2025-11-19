const prompt = `Analyze this SQL table and tell me what normal form it is in (1NF, 2NF, 3NF, or BCNF):

CRITICAL RULES:
1. Only analyze attributes that exist in THIS table
2. A transitive dependency means: attribute X determines attribute Y, where BOTH X and Y are non-primary-key attributes in this same table
3. If you cannot find evidence that attribute X determines attribute Y within this table, then NO transitive dependency exists
4. Do not assume dependencies between attributes unless there is clear evidence

Check step-by-step:
1. Does it have a primary key and atomic values? (1NF)
2. Any partial dependencies? (2NF - only matters if primary key has multiple columns)
3. Do any non-key attributes determine other non-key attributes in this table? (3NF)
4. Are all determinants candidate keys? (BCNF)

Example of transitive dependency:
- Table has: empId (PK), zipCode, city
- If zipCode determines city, then this violates 3NF
- Table has: empId (PK), name, departmentId, salary
- If name, departmentId, and salary are all independent of each other, then NO transitive dependency exists

Return ONLY valid JSON with no markdown formatting:
{
  "normalForm": "",
  "reasoning": ""
}`;

export default prompt;