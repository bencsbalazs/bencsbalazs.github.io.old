#/bin/sh
echo -n Cím: ; read title;
name=$(echo $(date +"%Y-%m-%d")-$title.md | sed 's/ /-/g')
echo -n description: ; read description;
echo -n categories: ; read categories;
echo -n tags: ; read tags;

cat <<EOT >> _posts/$name
---
type: post

author: Balázs

title: $title
description: 

date: $(date +"%Y-%m-%d,%H:%M:%S")
categories: [$categories]
tags: [$tags]
---
# Text...
EOT