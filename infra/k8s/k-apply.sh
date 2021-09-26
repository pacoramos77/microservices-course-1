kubectl apply -f .

kubectl rollout restart deployment posts-depl
kubectl rollout restart deployment comments-depl
kubectl rollout restart deployment event-bus-depl
kubectl rollout restart deployment moderation-depl
kubectl rollout restart deployment query-depl

watch kubectl get pod,services

