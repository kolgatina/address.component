<? if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die(); ?>

<div class="address-line">
    <div id="address-line-delivery">
        <div class="address-line-comment">
            Проверь адрес:
        </div>
        <div class="person-address address-line-form">
            <div class="delivery-content">
                <form action="" method="POST" name="ORDER_FORM" id="ORDER_FORM">
                    <span>
                        <input class="address-line-street street" name="street" placeholder="Улица">
                        <span class="address-line-prompt prompt"></span>
                    </span>
                    <ul class="search-results-list"></ul>
                    <div class="street-delete"></div>

                    <input class="address-line-house house" name="house" placeholder="Номер дома">
                    <ul class="search-results-list-house"></ul>

                    <input class="address-line-city" type="hidden" name="city"
                           value="<?= $arResult['CITY']['NAME'] ?>">
                    <input class="address-line-point address-point-lat" type="hidden" name="lat">
                    <input class="address-line-point address-point-lon" type="hidden" name="lon">
                </form>
            </div>
            <div class="pickup-content">
                <div class="pickup-content-text"><a>выбор магазина</a>.</div>
            </div>
        </div>
        <div class="address-line-info">
            <div class="roll-down-address-line-info">
                <div class="address-ok">
                    <div class="address-ok-block address-line-price pay-zone">
                        <div class="pay-zone-message">
                            <p>Это зона платной доставки.</p>
                            <div class="pay-zone-icon">
                                <div class="snipping-tooltip pay-zone-hover-explain">
                                    <span>Доставка по зоне за дополнительную оплату.</span>
                                </div>
                            </div>
                        </div>
                        При заказе от <div class="price"></div> Р — <div class="pay-zone-price"></div> Р,
                        менее <div class="price"></div> Р — <div class="total-zone-price"></div> Р.
                    </div>

                    <div class="address-ok-block address-line-price free-zone">
                        Бесплатная доставка при заказе от <div class="price"></div> Р,
                        менее <div class="price"></div> Р — <div class="delivery-price"></div> Р.
                    </div>

                    <div class="address-ok-block address-line-time">
                        Время доставки: <div class="time"></div> минут.
                    </div>
                </div>

                <div class="address-nope">
                    <div class="address-problem-block address-line-no-delivery">
                        По этому адресу не осуществляется доставка.
                    </div>
                </div>

                <div class="address-no-data">
                    <div class="address-problem-block address-line-unknown-address">
                        Неизвестный адрес.
                    </div>
                </div>
            </div>
            <div class="roll-up-address-line-info" style="display: none">
                Показать условия доставки
            </div>
        </div>
    </div>
    <div id="address-line-pickup" style="display: none">
        Выбранный магазин: <div class="selected-store-name"></div>, <div class="selected-store-address"></div> <div class="edit-pickup-icon"></div>.
    </div>
</div>