// Bộ lọc
    const buttonStatus = document.querySelectorAll("[button-status]");
    if(buttonStatus){
      buttonStatus.forEach(button => {
        button.addEventListener("click",() => {
          const url = new URL(window.location.href);
          console.log(url)
          const status = button.getAttribute("button-status");
          if(status){
            url.searchParams.set("status",status);  
          }else{
            url.searchParams.delete("status")
          }
          window.location.href = url.href
        })
      })
    }


// End bộ lọc


// Tìm kiếm 
const formSearch = document.querySelector("#form-search");

    if(formSearch){
      formSearch.addEventListener("submit",(e) => {
        const url = new URL(window.location.href);
          e.preventDefault();
          const keyword = e.target.elements.keyword.value;
          if(keyword){
            url.searchParams.set("keyword",keyword);
          }else{
            url.searchParams.delete("keyword");
          }
          window.location.href = url.href;
      })
    }

// End Tìm kiếm

// Pagination
    const buttonsPagination = document.querySelectorAll("[buttonPaginationPage]");
    if(buttonsPagination.length > 0){
      buttonsPagination.forEach(button => {
        button.addEventListener("click",() => {
          const url = new URL(window.location.href);
          const page = button.getAttribute("buttonPaginationPage");
          url.searchParams.set("page",page);
          window.location.href = url.href
        })
      })
    }


// End Pagination




//Change-Status
    const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
    const formChangeStatus = document.querySelector("#form-change-status");
    if(buttonsChangeStatus.length > 0){
      buttonsChangeStatus.forEach(button => {
        button.addEventListener("click",() => {
          const statusCurrent = button.getAttribute("data-status");
          const statusChange = statusCurrent == "active"? "inactive":"active"
          const id = button.getAttribute("id");
          const path = formChangeStatus.getAttribute("path");
          const action = path +`${statusChange}/${id}?_method=PATCH`;
          formChangeStatus.action = action;
          formChangeStatus.submit();
        })
      })
  
    }
// End Change-Status



//Change-Multi
const inputAll = document.querySelector("[check-box-all]");
const inputsID = document.querySelectorAll("[check-box-id]");
    if(inputAll){
      inputAll.addEventListener("click",()=>{
        if(inputAll.checked){
          inputsID.forEach(input => {
            input.checked = true;
          })
        }else{
          inputsID.forEach(input => {
            input.checked = false;
          })
        }
      })
  
      inputsID.forEach(input => {
        input.addEventListener("click",() =>{
          const countInputChecked = document.querySelectorAll("[check-box-id]:checked").length;
          if(countInputChecked == inputsID.length){
            inputAll.checked = true;
          }else{
            inputAll.checked = false;
          }
        })
      })
    }
  
//End Change Multi



// Form Change Multi
    const formChangeMulti = document.querySelector("[form-change-multi]");
    if(formChangeMulti){
        formChangeMulti.addEventListener("submit",(e) =>{
          e.preventDefault();
          const inputsChecked = document.querySelectorAll("[check-box-id]:checked");
          const ids = formChangeMulti.querySelector("input[name=ids]");
          const type = e.target.elements.type.value;
          
 
          if(inputsChecked.length > 0){
            if(type == "delete"){
              const check = confirm("Bạn có chắc chắn muốn xóa tất cả không?");
              if(!check){
                return;
              }
            }
            const dataids = [];
            inputsChecked.forEach(input => {
                if(type == "change-position"){
                    const position = input.closest("tr").querySelector("input[input-position]").value;           
                    dataids.push(`${input.id}-${position}`)
                }else{
                  dataids.push(input.id)
                }
             
            })
            ids.value = dataids.join(", "); 
            formChangeMulti.submit();
            console.log(ids.value)
          }else{
            alert("Vui lòng chọn 1 bản ghi");
          }
       
        })
    }
// End Form Change Multi



// Delete Product 
    const buttonsDelete = document.querySelectorAll("[button-delete-product]");
    if(buttonsDelete.length > 0){
      const formDelete = document.querySelector("#form-delete");
      buttonsDelete.forEach(button => {
        button.addEventListener("click",()=>{
            var action = formDelete.getAttribute("PATH");
            const id = button.getAttribute("id");
            action += id +"?_method=PATCH";
            formDelete.action = action;
            formDelete.submit()
        })
      })
    }
// End Delete Product 


// Show Alert
    const showAlert = document.querySelector("[show-alert]");
    if(showAlert){
      const time = showAlert.getAttribute("data-time");
      setTimeout(() => {
        showAlert.classList.add("alert-hidden");
      }
      ,time)
  
  
      const closeAlert = document.querySelector("[close-alert]");
      closeAlert.addEventListener("click",() =>{
        showAlert.classList.add("alert-hidden");
      })
    }


// End Show Alert 



// Upload Image
   const uploadImage = document.querySelector("[upload-image]");
   if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    uploadImageInput.addEventListener("change",(e)=>{
      const file = e.target.files[0];
      if(file){
        uploadImagePreview.src = URL.createObjectURL(file);
      }
    })
   }
// End Upload Image