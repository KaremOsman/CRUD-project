// allInputs  >>
var PName = document.getElementById('ProductName');
var PPrice = document.getElementById('ProductPrice');
var PCatogry = document.getElementById('ProductCatogry');
var PDiscription = document.getElementById('ProductDiscription');
var PImage = document.getElementById('ProductImage');
var search = document.getElementById('search');
var Updatebtn = document.getElementById('Updatebtn');
var addbtn = document.getElementById('addbtn');
var storedProductList = JSON.parse(localStorage.getItem("products"));
var ProductList;
var myIndex;


if (localStorage.getItem("products") == null || storedProductList.length == 0) {
	masage()
	ProductList = [];
}
else {
	ProductList = storedProductList;
	display(ProductList)
}

function clear() {
	PName.value = null;
	PPrice.value = null;
	PCatogry.value = null;
	PDiscription.value = null;
	PImage.value = null;
}
function AddProduct() {
	if (PName.classList.contains("is-valid") &&
		PPrice.classList.contains("is-valid") &&
		PCatogry.classList.contains("is-valid") &&
		PDiscription.classList.contains("is-valid")) {
		var image = PImage.files[0]?.name;
		var Product = {
			name: PName.value,
			price: PPrice.value,
			catogry: PCatogry.value,
			discription: PDiscription.value,
			img: `images/${image}`
		};

		ProductList.push(Product);
		localStorage.setItem("products", JSON.stringify(ProductList));
		display(ProductList);
		clear();
	}
	else {
		window.alert("Not Valid Data")

	}
}

function display(array) {
	var cartona = "";
	for (var i = 0; i < array.length; i++) {
		cartona += `	<div class="col-md-6 col-lg-4 col-xl-3 pt-2">
				<div class="item p-4 border border-3 border-primary rounded-4">
					<img src="${array[i].img}" alt="phone " class="w-100  ">
					<h4 class="pt-3">name : ${array[i].name} </h4>
					<p>price : ${array[i].price} $</p>
					<p>catrgory : ${array[i].catogry}</p>
					<p>Discription :${array[i].discription} </p>
					<button  onclick="Update(${i})" class="btn btn-outline-warning w-50 "> Update <i class="fa-solid fa-pen"></i> </button>
					<button onclick="Delete(${i})" class="btn btn-outline-danger ms-3"> Delete <i class="fa-solid fa-trash"></i> </button>
					<button onclick="Delete(${i})" class="btn btn-success w-100 mt-3 fs-5"> BUY IT <i class="fa-solid fa-cart-shopping fa-bounce ms-3" style="color: #ffffff;"></i> </button>
					</div>
			</div>`	}
	document.getElementById("myRow").innerHTML = cartona;
}

function Delete(deleteIndex) {
	ProductList.splice(deleteIndex, 1);
	localStorage.setItem("products", JSON.stringify(ProductList));
	display(ProductList)

	if (ProductList.length == 0) {
		alert(); console.log("alert funtion run");
	}
}

function Update(UpdateIndex) {
	myIndex = UpdateIndex;
	PName.value = ProductList[UpdateIndex].name;
	PPrice.value = ProductList[UpdateIndex].price;
	PCatogry.value = ProductList[UpdateIndex].catogry;
	PDiscription.value = ProductList[UpdateIndex].discription;
	Updatebtn.classList.remove("d-none");
	addbtn.classList.add("d-none");
	PName.classList.add("is-valid");
	PPrice.classList.add("is-valid");
	PCatogry.classList.add("is-valid");
	PDiscription.classList.add("is-valid")
}

function edit() {
	if (PName.classList.contains("is-valid") &&
		PPrice.classList.contains("is-valid") &&
		PCatogry.classList.contains("is-valid") &&
		PDiscription.classList.contains("is-valid")) {
		ProductList[myIndex].name = PName.value;
		ProductList[myIndex].price = PPrice.value;
		ProductList[myIndex].catogry = PCatogry.value;
		ProductList[myIndex].discription = PDiscription.value;
		localStorage.setItem("products", JSON.stringify(ProductList))
		display(ProductList);
		Updatebtn.classList.add("d-none")
		addbtn.classList.remove("d-none")
		clear()
	}
	else {
		alert("Data Not Valid")
	}
}

function masage() {
	document.getElementById("myRow").innerHTML = (
		`<div class="alert alert-danger w-50 mx-auto text-center fs-4" role="alert">
  No Product Added Yet! <i class="fa-solid fa-triangle-exclamation fa-fade" style="color: #ff0000;"></i>
</div>`)
}
function notFoundAlert() {
	document.getElementById("myRow").innerHTML = (
		`<div class="alert alert-danger w-50 mx-auto text-center fs-4" role="alert">
  Not Founded ! <i class="fa-solid fa-triangle-exclamation fa-fade text-warning" ;"></i>
</div>`)
}
function Search() {
	var word = search.value.toLowerCase();
	var searchedProducr = [];
	for (var i = 0; i < ProductList.length; i++) {
		if (ProductList[i].name.toLowerCase().includes(word)) {
			searchedProducr.push(ProductList[i]);
		};
	};
	if (searchedProducr == "") { notFoundAlert() }
	else { display(searchedProducr) }
}

function validation(element) {
	var Ppatterns = {
		ProductName: /^[A-Z][a-z]{2,9}$/,
		ProductPrice: /^[^0][0-9]{1,8}$/,
		ProductCatogry: /^(tv|mobile|labtop|screen)$/i,
		ProductDiscription: /\w{3,9}\s/g
	}
	if (Ppatterns[element.id].test(element.value)) {
		console.log("true");
		element.classList.add("is-valid");
		element.classList.remove("is-invalid");
		element.nextElementSibling.classList.add("d-none");
	}
	else {
		console.log("false");
		element.classList.remove("is-valid");
		element.classList.add("is-invalid");
		element.nextElementSibling.classList.remove("d-none");
	}


}
