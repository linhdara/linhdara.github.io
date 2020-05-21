
const socket= io('http://localhost:3000');
$('#div-chat').hide();
socket.on('Danh_sach_online',arrUserInfo=>{
	$('#div-chat').show();
	$('#div-singnUp').hide();
	arrUserInfo.forEach(user=>{
		const {ten,peerId}=user;
		$('#ulUser').append(`<li id="${peerId}">${ten}</li>`);
		});
		
	socket.on('Co_nguoi_vua_ket_noi',user=>{
		const {ten,peerId}=user;
		$('#ulUser').append(`<li id="${peerId}">${ten}</li>`);
	});
	socket.on('Co_nguoi_vua_ngat_ket_noi',peerId=>{
		$(`#${peerId}`).remove();
	});
});
socket.on('Tai_khoan_da_ton_tai',()=>alert('Ten nguoi dung da ton tai!'));
function openStream(){
	const config ={audio: false, video: true};
	return navigator.mediaDevices.getUserMedia(config);
}
function playStream(idVideoTag, stream){
	const video = document.getElementById(idVideoTag);
	video.srcObject=stream;
	video.play();
}
const peer = new Peer({key:'jc6q9vr2m27w4s4i'});
peer.on('open',id=>{
	$('#my-peer').append(id);
	$('#btnSignUp').click(()=> {
	const username=$('#txtUsername').val();
	socket.emit('Dang_ky',{ten: username, peerID: id});
	
});
});
//Caller
$('#btnCall').click(()=>{
	const id =$('#remoteId').val();
	openStream()
	.then(stream =>{
		playStream('localStream',stream);
		const call =peer.call(id,stream);
		call.on('stream',remoteStream => playStream('remoteStream',remoteStream));
	});
});
//Callee
peer.on('call',call =>{
	openStream()
	.then(stream=>{
		call.answer(stream);
		playStream('localStream',stream);
		call.on('stream',remoteStream => playStream('remoteStream',remoteStream));
	});
});
