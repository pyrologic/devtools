class PyrologicRollupPlugin {

    constructor() {
        this.wcount = 0;
        this.fcount = 0;
        this.verboseOutput = false;
        this.filterCDWarning = false;
    }

    static getInstance() {
        return singleton;
    }

    infoBuildStart() {
        this.wcount = 0;
        this.fcount = 0;
    }

    infoBuildEnd() {
        const wc = this.wcount;
        const ft = (this.verboseOutput && this.filterCDWarning) ? ` (${this.fcount} warnings filtered out.)` : '';
        if ( wc > 0 ) {
            console.log('\x1b[33m%s\x1b[0m', `Build ended with ${wc} warnings!${ft}`);
        } else {
            console.log('\x1b[32m%s\x1b[0m', `Build ended with no warnings.${ft}`);
        }
    }

    timestampBuildStart(args) {
        let name = '';
        if ( typeof args === 'string') {
            name = args;
        } else if ( typeof args === 'object' ) {
            name = args.name;
        }
        if ( typeof name === 'string' && name.length > 0 ) {
            console.log(`\n[${new Date().toLocaleString()}] New "${name}" build.\n`);
        } else {
            console.log(('\n[' + new Date().toLocaleString() + ']') + ' New rollup build.\n' );
        }
        return null;
    }

    infoPlugin(options = {}) {
        const opts = options || {};
        this.verboseOutput = !!opts.verboseOutput;
        this.filterCDWarning = !!opts.filterCDWarning;
        const self = this;
        return {
            name: 'pyrologic-info-plugin',
            buildStart() {
                self.infoBuildStart();
            },
            buildEnd() {
                self.infoBuildEnd();
            }
        }
    }

    timestampPlugin(args) {
        const self = this;
        return {
            name: 'pyrologic-timestamp-plugin',
            buildStart() {
                self.timestampBuildStart(args);
            }
        }
    }

    onwarn ( { loc, frame, message } ) {
        if ( this.filterCDWarning ) {
            if ( (typeof message === 'string') && (message.length > 0) ) {
                const mup = message.toUpperCase();
                if ( mup.includes('CIRCULAR') && mup.includes('DEPENDENCY') ) {
                    // ignore!
                    ++this.fcount;
                    return;
                }
            }
        }
        if ( loc ) {
            console.warn(`#${++this.wcount}: ${loc.file} (${loc.line}:${loc.column}) ${message}`);
            if ( frame ) {
                console.warn(frame);
            }
        } else {
            console.warn(`#${++this.wcount}: ${message}`);
        }
    }
}

const singleton = new PyrologicRollupPlugin();

// we use a >>> named <<< export - so import the plugin this way:
//    import { PyrologicRollupPlugin } from "@pyrologic/rollup-plugin";

export { PyrologicRollupPlugin };
