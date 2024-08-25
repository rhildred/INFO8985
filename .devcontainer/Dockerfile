FROM mcr.microsoft.com/vscode/devcontainers/python

RUN apt update 

RUN apt install -y ansible r-base r-base-dev pandoc texlive nodejs

COPY hosts /etc/ansible/hosts

RUN R -e 'install.packages("rmarkdown")'

RUN R -e "install.packages('languageserver', repos='https://cloud.r-project.org/')"

RUN curl -qL https://www.npmjs.com/install.sh | sh