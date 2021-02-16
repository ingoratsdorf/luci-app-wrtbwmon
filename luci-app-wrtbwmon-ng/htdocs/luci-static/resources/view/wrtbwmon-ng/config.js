'use strict';
'require form';
'require fs';
'require uci';

function dirName(str) {
    var n = str.lastIndexOf('/');
    return n > -1 ? str.slice(0, n + 1) : '';
}

return L.view.extend({
    lastPath: null,

    load: function() {
        return uci.load('wrtbwmon-ng').then(L.bind(function() {
            this.lastPath = uci.get_first('wrtbwmon-ng', 'wrtbwmon-ng', 'database') || null;
        }, this));
    },

    render: function() {
        var m, s, o;

        m = new form.Map('wrtbwmon-ng', _('Usage - Configuration'));

        s = m.section(form.NamedSection, 'general', 'wrtbwmon-ng', _('General settings'));
        s.addremove = false;

        o = s.option(form.Flag, 'enabled', _('Keep running in the background'));
        o.rmempty = true;

        o = s.option(form.Value, 'database', _('Database path'), _('This box is used to select the Database path, which is /tmp/usage.sqlite by default.'));
        o.value('/tmp/usage.sqlite');
        o.value('/etc/usage.sqlite');
        o.default = '/tmp/usage.sqlite';
        o.rmempty = false;

        return m.render();
    },

    changePath: function() {
        return uci.changes().then(L.bind(function(res) {
            if (res['wrtbwmon-ng'] && this.lastPath) {
                for (var i = 0; i < res['wrtbwmon-ng'] - ng.length; i++) {
                    if (res['wrtbwmon-ng'][i][2] == 'database') {
                        var newPath = res['wrtbwmon-ng'][i][3];
                        return fs.stat(dirName(newPath)).then(L.bind(function(res) {
                            if (res.type == 'directory') {
                                Promise.all([
                                    fs.exec('/bin/cp', ['-fp', this.lastPath, newPath]),
                                ]);
                                return true;
                            } else {
                                var err = new Error('Can\'t move files to non-directory path.');
                                err.name = 'NotDirectoryError';
                                throw err;
                            }
                        }, this)).catch(function(err) {
                            throw err;
                        })
                    }
                }
            }
            return false;
        }, this));
    },

    handleSaveApply: function(ev, mode) {
        return this.handleSave(ev).then(L.bind(this.changePath, this)).then(L.bind(function(data) {
            L.resolveDefault(L.ui.changes.apply(mode == '0')).then(L.bind(function() {
                if (data) {
                    Promise.all([
                        fs.exec('/bin/rm', ['-f', this.lastPath]),
                    ]);
                }
            }, this));
        }, this)).catch(function(err) {
            if (confirm(err + '\n\n' + _('This will revert the changes. Are you sure?'))) {
                L.bind(L.ui.changes.revert, L.ui.changes)();
            }
        });
    }
});