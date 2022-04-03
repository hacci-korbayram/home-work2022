const formValues = () =>{
    return{
        name: document.querySelector("#name").value,
        imgSrc: document.querySelector("#imgSrc").value,
        phoneNumber: document.querySelector("#phoneNumber").value,
    };
};

let id = null;

document.querySelector("#save").addEventListener("click",(e) =>{
    e.preventDefault();
    console.log(save);
    const user = formValues();
    if(id){
        user.id = id;
    }

    fetch(`http://localhost:500/user/${id || ''}`,{
        method: !id? "POST" : "PUT",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((message) => {
        console.log(message);
        window.location.href ="../user-edit/index.html";
    });
});
(() => {
    let queryParms = window.location.search;
    if(queryParms){
        id = queryParms.split("=")[1];

        fetch(`http://localhost:500/user/${id}`)
        .then((res) => res.json())
        .then((user) =>{
            document.querySelector("#name").value = user.name;
            document.querySelector("#phoneNumber").value = user.phoneNumber;
            document.querySelector("#imgSrc").value = user.imgSrc;
            id = user.id;
        });
    }
})();
