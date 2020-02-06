(function() {

    updateTotal()
    $(".shop .cart-checkbox").click(function() {
        addBGColor(this, $(this).parents(".shop-main").find(".item-full"))
        let checked = $(this).parents(".shop-main").find(".cart-checkbox").prop("checked")
        $(this).parents(".shop-main").find(".cart-checkbox").prop("checked", checked)
    })
    $(".select-all .cart-checkbox").click(function() {
        addBGColor(this, $(".item-full"))
        let checked = $(this).prop("checked")
        $(".cart-checkbox").prop("checked", checked)
    })
    $(".p-checkbox .cart-checkbox").click(function() {
        addBGColor(this, $(this).parents(".item-full"))
    })
    $(".increment").click(function() {
        let currVal = parseInt($(this).siblings("input").val())
        if (typeof currVal === 'number' && currVal % 1 === 0) {
            currVal++
            $(this).siblings("input").val(parseInt(currVal))
        } else {
            $(this).siblings("input").val(1)
        }
        updateSum(this, currVal)
        updateTotal()
    })
    $(".decrement").click(function() {
        let currVal = parseInt($(this).siblings("input").val())
        if (typeof currVal === 'number' && currVal % 1 === 0) {
            currVal--
            currVal - 1 > 0 ? $(this).siblings("input").val(parseInt(currVal)) : $(this).siblings("input").val(1)
        }
        updateSum(this, currVal)
        updateTotal()
    })
    $(".p-quantity input").change(function() {
        let currVal = parseInt($(this).val())
        if (typeof currVal === 'number' && currVal % 1 === 0) {
            updateSum(this, currVal)
            $(this).val(currVal)
            updateTotal()
        }
    })
    $(".cart-remove").click(function() {
        clearItem($(this).parents(".item-full"))
        clearShop()
    })
    $(".remove-batch").click(function() {
        clearSelected()
    })
    $(".clear-cart").click(function() {
        clearAll()
    })
}());

function updateSum(_this, currVal) {
    let price = $(_this).parents(".p-quantity").siblings(".p-price").find("strong").text().substr(1)
    let total = currVal * price
    $(_this).parents(".p-quantity").siblings(".p-sum").find("strong").html(`￥${total.toFixed(2)}`)
}

function updateTotal() {
    let total = 0
    $(".p-sum strong").each(function(index, element) {
        let currSum = parseFloat($(element).text().substr(1))
        total += currSum
    })
    $(".price-sum em").html(`￥${total.toFixed(2)}`)
}

function addBGColor(_this, _target) {
    if ($(_this).prop("checked")) {
        _target.addClass("item-selected")
    } else {
        _target.removeClass("item-selected")
    }
}

function clearItem(_this) {
    $(_this).remove()
    updateTotal()
}

function clearShop() {
    let count = 0
    let itemNum = $(".item-list").length
    $(".shop-main .item-list").each(function(index, element) {
        if ($(element).children().length === 0) {
            clearItem($(element).parents(".shop-main"))
            count++
        }
    })
    if (count === itemNum) {
        clearAll()
    }
}

function clearSelected() {
    $(".p-checkbox .cart-checkbox").each(function(index, element) {
        if ($(element).prop("checked")) {
            clearItem($(element).parents(".item-full"))
        }
    })
    clearShop()
}

function clearAll() {
    $(".cart-main").remove()
}