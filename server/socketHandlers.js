const { User, Message, Dialog } = require("./db/models");

const userSocketMap = new Map();

const handleSocketConnection = async (io) => {
  //connection

  io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("reg", (id) => {
      userSocketMap.set(id, socket.id);
      console.log(socket.id);
    });

    // send message

    socket.on("chat message", async (message, user, receiverId) => {
      const receiverSocketId = userSocketMap.get(receiverId);
      const senderSocketId = userSocketMap.get(user.id);

      const rangeId = [user.id, receiverId].sort((a, b) => a - b);

      let dialog = await Dialog.findOne({ where: { userId1: rangeId[0], userId2: rangeId[1] } });
      if (!dialog) {
        dialog = await Dialog.create({ userId1: rangeId[0], userId2: rangeId[1] });
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('add dialog', dialog);
          io.to(senderSocketId).emit('add dialog', dialog);
        } else {
          io.to(senderSocketId).emit('add dialog', dialog);
        }

      }
      const newMessage = await Message.create({
        senderId: user.id,
        receiverId,
        dialogId: dialog.id,
        content: message,
      });

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("chat message", { newMessage, user });
        io.to(senderSocketId).emit("chat message", { newMessage, user });
      } else {
        io.to(senderSocketId).emit("chat message", { newMessage, user });
        console.log("Receiver socket not found");
      }
    });

    // disconnect

    socket.on("disconnect", () => {
      userSocketMap.forEach((value, key) => {
        if (value === socket.id) {
          userSocketMap.delete(key);
        }

        console.log("user disconnected");
      });
    });
  });
};

module.exports = handleSocketConnection;
