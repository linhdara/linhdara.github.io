const io = require('socket.io')(3000);
const arrUserInfo =[];
io.on('connection',socket=>{
	socket.on('Dang_ky',user =>{
		const isExist=arrUserInfo.some(e=>e.ten===user.ten);
		socket.peerId=user.peerId;
		if(isExist){
			return socket.emit('Tai_khoan_da_ton_tai');
		}
		arrUserInfo.push(user);
		socket.emit('Danh_sach_online',arrUserInfo);
		socket.broadcast.emit('Co_nguoi_vua_ket_noi',user);
	});
	socket.on('disconnect',()=>{
		const index= arrUserInfo.findIndex(user=>user.peerId===socket.peerId);
		arrUserInfo.splice(index,1);
		io.emit('Co_nguoi_vua_ngat_ket_noi', socket.peerId);
	});
});