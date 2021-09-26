
root="$(git rev-parse --show-toplevel)"

docker build -t pacor2010/event-bus "${root}/event-bus"
docker push pacor2010/event-bus

docker build -t pacor2010/posts "${root}/posts"
docker push pacor2010/posts

docker build -t pacor2010/comments "${root}/comments"
docker push pacor2010/comments

docker build -t pacor2010/moderation "${root}/moderation"
docker push pacor2010/moderation

docker build -t pacor2010/query "${root}/query"
docker push pacor2010/query

docker images | grep pacor2010/
