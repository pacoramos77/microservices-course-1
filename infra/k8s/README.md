
https://stackoverflow.com/questions/42564058/how-to-use-local-docker-images-with-minikube


```
minikube start

eval $(minikube docker-env)

minikube dashboard



docker build -t my-image .

kubectl apply -f posts.yaml



kubectl get all

```


https://minikube.sigs.k8s.io/docs/handbook/kubectl/


https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/
