// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Script, console} from "forge-std/Script.sol";
import {BaseSatellite} from "../src/BaseSatellite.sol";

contract BaseSatelliteScript is Script {
    BaseSatellite public baseSatellite;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        baseSatellite = new BaseSatellite();

        vm.stopBroadcast();
    }
}
