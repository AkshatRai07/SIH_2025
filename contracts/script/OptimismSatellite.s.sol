// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Script, console} from "forge-std/Script.sol";
import {OptimismSatellite} from "../src/OptimismSatellite.sol";

contract OptimismSatelliteScript is Script {
    OptimismSatellite public optimismSatellite;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        optimismSatellite = new OptimismSatellite();

        vm.stopBroadcast();
    }
}
