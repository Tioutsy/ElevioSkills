import os, sys, re, json

# Import the data dictionary and verification logic
with open("artifacts/api-server/src/lib/diagnosticEngine.ts") as f:
    diag_content = f.read()
diag_prompts = set(re.findall(r"prompt:\s*[\"\x27`]([^\"]+)[\"\x27`]", diag_content))

from sprint17_0A_course_data import COURSES_DATA

print("Diagnostic prompts loaded:", len(diag_prompts))
print("Courses in COURSES_DATA:", list(COURSES_DATA.keys()))

for code, data in COURSES_DATA.items():
    qs = data["questions"]
    assert len(qs) == 10, f"{code} does not have 10 questions, has {len(qs)}"
    dist = {"A": 0, "B": 0, "C": 0, "D": 0}
    for i, q in enumerate(qs):
        assert len(q["options"]) == 4, f"{code} Q{i+1} does not have 4 options"
        assert len(q["optionFeedback"]) == 4, f"{code} Q{i+1} does not have 4 optionFeedback items"
        assert q["correct"] in [0, 1, 2, 3], f"{code} Q{i+1} invalid correct index {q['correct']}"
        assert q["question"] not in diag_prompts, f"{code} Q{i+1} overlaps with diagnostic prompts!"
        letter = ["A", "B", "C", "D"][q["correct"]]
        dist[letter] += 1
    
    for l, cnt in dist.items():
        assert 2 <= cnt <= 3, f"{code} key distribution unbalanced: {l} is {cnt} (dist: {dist})"
    print(f"Verified {code}: 10 questions, distribution {dist}")

print("All course assessment datasets verified successfully!")
