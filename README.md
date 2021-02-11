# luci-app-wrtbwmon-ng

[![CI](https://github.com/ingoratsdorf/luci-app-wrtbwmon-ng/workflows/CI/badge.svg)](https://github.com/ingoratsdorf/luci-app-wrtbwmon-ng/actions)
[![GitHub All Releases](https://img.shields.io/github/downloads/ingoratsdorf/luci-app-wrtbwmon-ng/total)](https://github.com/ingoratsdorf/luci-app-wrtbwmon-ng/releases)
[![Lastest Release](https://img.shields.io/github/release/ingoratsdorf/luci-app-wrtbwmon-ng.svg?style=flat)](https://github.com/ingoratsdorf/luci-app-wrtbwmon-ng/releases)

This repo provides yet another LuCI module for wrtbwmon, which has similar features with [Kiougar's one](https://github.com/Kiougar/luci-wrtbwmon). The differnence is that this one has more features supported:
1. Support IPV6.
1. Identify a host by the unique MAC rather than its IP.
1. Use the progress bar to display the total bandwidth.
1. Convert to client side for rendering just as what the new openwrt release has done.

#### Attention:
The [pyrovski's wrtbwmon](https://github.com/pyrovski/wrtbwmon) is **incompatible** with this LuCI app. **You must download the compatible one from [here](https://github.com/brvphoenix/wrtbwmon)**.

## Downloading
Openwrt 19.07 is fully supported.

* `openwrt-19.07`: [release-2.0.7](https://github.com/ingoratsdorf/luci-app-wrtbwmon-ng/releases/download/release-2.0.7/luci-app-wrtbwmon-ng_2.0.7-1_all.ipk)

After installing, you will see a new `Traffic status` menu item  in the `Network` menu list in the LuCI Page.

## Credits
Thanks to
* [Kiougar](https://github.com/Kiougar/luci-wrtbwmon) for the original codes.
* [pyrovski](https://github.com/pyrovski) for creating `wrtbwmon`.
