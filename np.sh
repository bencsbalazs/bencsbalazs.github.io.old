#/bin/sh
echo -n Cím: ; read title;
name=$(date +"%Y-%m-%d")-$title
name=$(echo $name | sed 's/ /-/g')
echo $name
cp _drafts/2019-03-01-example.md _drafts/$name.md
