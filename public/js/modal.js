let modal=document.querySelectorAll(".modal");
let cards=document.querySelectorAll(".card");
let closes=document.querySelectorAll(".close");
const bookmarks=document.getElementsByClassName("Bookmark");
const submitButton=document.getElementsByClassName("submit-inv");
for(let card of cards){
	card.onclick=function () {
		/* body... */
		modal[card.id].style.display = 'block';
	}

}
for(let close of closes){
	const index=close.id.slice(6);
	close.onclick=function () {
		/* body... */
		modal[index].style.display = 'none';
	}
}
for(let bookmark of bookmarks){
	bookmark.addEventListener("click", ()=>{
		const index=bookmark.id.slice(3,);
		const btn=submitButton[index];
		btn.click();
	});
}