.PHONY: up logs down build

up:
	docker-compose up -d --build

logs:
	docker-compose logs

down:
	docker-compose down

ba:
	docker build -t ryutaterada/k8s-express:1.1.5 ./src/api
	docker push ryutaterada/k8s-express:1.1.5

bw:
	docker build -t ryutaterada/k8s-nodejs:1.0.9 ./src/web
	docker push ryutaterada/k8s-nodejs:1.0.9

bd:
	docker build -t ryutaterada/k8s-mysql:1.0.4 ./src/db
	docker push ryutaterada/k8s-mysql:1.0.4

a:
	kubectl get all,pv,pvc,ingress

i:
	kubectl get all -n istio-system

dg:
	kubectl apply -f istio.yaml

da:
	kubectl apply -f api.yaml

dw:
	kubectl apply -f web.yaml

dd1:
	kubectl apply -f db1.yaml

dd2:
	kubectl apply -f db2.yaml

de:
	kubectl apply -f eco.yaml

cg:
	kubectl delete -f istio.yaml

ca:
	kubectl delete -f api.yaml

cw:
	kubectl delete -f web.yaml

cd:
	kubectl delete -f db1.yaml
	kubectl delete -f db2.yaml

cd1:
	kubectl delete -f db1.yaml

cd2:
	kubectl delete -f db2.yaml

ce:
	kubectl delete -f eco.yaml

mm:
	kubectl run -it --rm --image=ryutaterada/k8s-mysql --restart=Never mysql-client -- mysql -h db-service -proot

ww:
	kubectl exec -it web-6b64674b66-cncjl --container web-container /bin/sh

path:
	export PATH="/snap/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games"

istio:
	kubectl label namespace default istio-injection=enabled

all:
	kubectl apply -f db2.yaml
	kubectl apply -f api.yaml
	kubectl apply -f web.yaml
	kubectl apply -f eco.yaml

call:
	kubectl delete -f api.yaml
	kubectl delete -f web.yaml
	kubectl delete -f eco.yaml
	kubectl delete -f db1.yaml
	kubectl delete -f db2.yaml