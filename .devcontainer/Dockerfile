FROM mcr.microsoft.com/devcontainers/python:latest

RUN apt update 

RUN apt install -y r-base pandoc texlive nodejs

RUN R -e "install.packages('rmarkdown')"
RUN R -e "install.packages('languageserver', repos='https://cloud.r-project.org/')"

RUN curl -qL https://www.npmjs.com/install.sh | sh
