<? if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

class AddressComponent extends CBitrixComponent
{
    public function executeComponent()
    {
        // Получить текущий город
        $arFilter = array("IBLOCK_ID" => CITY_IBLOCK_ID, "ID" => $this->arParams["CITY_ID"]);
        $arNav = array("nTopCount" => 1);
        $arSelect = array("ID", "IBLOCK_ID", "NAME");
        $db = \CIBlockElement::GetList(array(), $arFilter, false, $arNav, $arSelect);
        $this->arResult["CITY"] = $db->Fetch();

        $this->includeComponentTemplate();
    }
}