
FROM aquabotwa/sanuwa-official:beta 

RUN git clone https://github.com/diabykavi/queendiabykaviaah /root/queendiana
WORKDIR /root/queendiana/
ENV TZ=Asia/Colombo
RUN yarn add supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
