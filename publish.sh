#!/bin/sh

echo What is the modification?; read comment;

git add -A
git commit -m "$comment"
git push