## OBS: gcloud auth login - antes de executar a tasks

Precisa entrar na instância para executar isso diretamente lá:
/opt/google-cloud-sdk/bin/gcloud init
passos no terminal:
1 -
Choose the account you would like to use to perform operations for this configuration:
[1] 390541733609-compute@developer.gserviceaccount.com
[2] Log in with a new account
Please enter your numeric choice: 1
2- Enter project ID you would like to use: personal-408200

## Requirements

1- Baixar e inicializar o CLI
2- Executar o comando gcloud auth login
3- adicionar "export USE_GKE_GCLOUD_AUTH_PLUGIN=True" à última linha do .bashrc e executar o comando "source .bashrc"
4- gcloud components update
5-"gcloud components install gke-gcloud-auth-plugin"
6- Definir o cluster (gcloud container clusters get-credentials <name> --zone <region>)
