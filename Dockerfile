FROM buildpack-deps:jessie

RUN groupadd --gid 1000 node \
  && useradd --uid 1000 --gid node --shell /bin/bash --create-home node

USER node

ENV NVM_DIR=/home/node/nvm
ENV NVM_SYMLINK_CURRENT true
ENV PATH=$PATH:/home/node/nvm/current/bin
RUN git clone https://github.com/creationix/nvm.git ~/nvm && cd ~/nvm && git checkout v0.33.11
RUN echo '. ~/nvm/nvm.sh' >> ~/.bashrc

RUN git clone https://github.com/alphagov/govuk-design-system.git ~/govuk-design-system

WORKDIR /home/node/govuk-design-system

RUN . ~/nvm/nvm.sh \
  || nvm install \
  && nvm use

RUN npm install
