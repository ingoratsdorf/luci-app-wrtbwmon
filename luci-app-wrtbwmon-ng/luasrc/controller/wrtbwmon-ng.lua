module("luci.controller.wrtbwmon-ng", package.seeall)

function index()
	if not nixio.fs.access("/etc/config/wrtbwmon-ng") then
		return
	end

	entry({"admin", "network", "usage"},
		alias("admin", "network", "usage", "details"),
		 _("Traffic Status"), 60).acl_depends={ "luci-app-wrtbwmon-ng" }
	entry({"admin", "network", "usage", "details"},
		view("wrtbwmon-ng/details"),
		_("Details"), 10)
	entry({"admin", "network", "usage", "config"},
		view("wrtbwmon-ng/config"),
		_("Configuration"), 20)
	entry({"admin", "network", "usage", "custom"},
		view("wrtbwmon-ng/custom"),
		_("User file"), 30)
end
