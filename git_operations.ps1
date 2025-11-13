# Git operations script to resolve merge conflicts and pull changes
cd "c:\Users\it c\Desktop\IMS-FRONTEND"

# Set git editor to avoid interactive prompts
git config --global core.editor "true"

# Add all resolved files
git add frontend/src/components/ContactPersonSelect.js
git add frontend/src/pages/complaint/ComplaintFormEnhanced.js
git add frontend/src/pages/complaint/SimplifiedComplaintForm.js
git add frontend/src/pages/PendingAssignments.js

# Commit the merge with a default message
git commit -m "Resolved merge conflicts in complaint forms and other components"

# Pull from remote repository
git pull --tags bitbucket main --no-edit

Write-Host "Git operations completed successfully"