let posts=JSON.parse(localStorage.getItem("posts"))||[];

let admin=false;

function save(){

localStorage.setItem("posts",JSON.stringify(posts));

}

function render(){

let list=document.getElementById("postList");

if(!list) return;

list.innerHTML="";

posts.forEach((p,i)=>{

let div=document.createElement("div");

div.className="post";

div.innerHTML="<h3>"+p.title+"</h3>";

div.onclick=()=>openPost(i);

if(admin){

let edit=document.createElement("button");

edit.innerText="Sửa";

edit.onclick=(e)=>{

e.stopPropagation();

editPost(i);

};

let del=document.createElement("button");

del.innerText="Xóa";

del.onclick=(e)=>{

e.stopPropagation();

deletePost(i);

};

div.appendChild(edit);

div.appendChild(del);

}

list.appendChild(div);

});

}
function displayPosts(){

let posts = JSON.parse(localStorage.getItem("posts")) || [];

let postList = document.getElementById("postList");

postList.innerHTML="";

posts.forEach((post,index)=>{

let div=document.createElement("div");

div.className="post";

div.innerHTML=`

<h2 onclick="openPost(${index})">${post.title}</h2>

<p>${post.content.substring(0,100)}...</p>

<button onclick="editPost(${index})">Sửa</button>

<button onclick="deletePost(${index})">Xóa</button>

`;

postList.appendChild(div);

});

}

function addPost(){

const title = document.getElementById("titleInput").value;
const content = document.getElementById("contentInput").value;

if(!title || !content){
alert("Nhập đầy đủ tiêu đề và nội dung");
return;
}

const posts = JSON.parse(localStorage.getItem("posts")) || [];

posts.unshift({
title:title,
content:content
});

localStorage.setItem("posts",JSON.stringify(posts));

document.getElementById("titleInput").value="";
document.getElementById("contentInput").value="";

renderPosts();

}

let title=document.getElementById("titleInput").value;

let content=document.getElementById("contentInput").value;

let posts = JSON.parse(localStorage.getItem("posts")) || [];

if(window.editIndex!=null){

posts[editIndex]={title,content};

editIndex=null;

}else{

posts.push({title,content});

}

localStorage.setItem("posts",JSON.stringify(posts));

closeForm();

displayPosts();

}

function deletePost(index){

let posts = JSON.parse(localStorage.getItem("posts")) || [];

if(confirm("Xóa bài này?")){

posts.splice(index,1);

localStorage.setItem("posts",JSON.stringify(posts));

displayPosts();

}

}

function editPost(index){

let posts = JSON.parse(localStorage.getItem("posts")) || [];

let post = posts[index];

document.getElementById("titleInput").value = post.title;

document.getElementById("contentInput").value = post.content;

showForm();

window.editIndex=index;

}

function openPost(i){

localStorage.setItem("currentPost",i);

location.href="post.html";

}

function loadPost(){

let index=localStorage.getItem("currentPost");

if(index===null) return;

let p=posts[index];

document.getElementById("title").innerText=p.title;

document.getElementById("content").innerHTML=p.content.replace(/\n/g,"<br>");

}

function adminLogin(){

let pass = prompt("Nhập mật khẩu admin:");

if(pass==="123456"){

document.getElementById("addBtn").style.display="block";

alert("Đăng nhập thành công");

}else{

alert("Sai mật khẩu");

}

}
function showForm(){

document.getElementById("formBox").style.display="block";

}

function closeForm(){

document.getElementById("formBox").style.display="none";

}


render();
