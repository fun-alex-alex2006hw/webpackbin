import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import styles from '../common.css'
import Input from 'components/Input'
import Checkbox from 'components/Checkbox'
import Description from 'components/Description'

export default connect({
  config: state`bin.currentBin.loaders.babel`,
  loaderConfigChanged: signal`bin.configure.loaderConfigChanged`
},
  function BabelLoader ({
    config,
    loaderConfigChanged
  }) {
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.info}>
          Transpile code to modern JavaScript
        </div>
        <div className={styles.section}>
          <Checkbox
            disabled={!config}
            checked={config && config.es2015}
            onChange={() => {
              loaderConfigChanged({
                loaderName: 'babel',
                configName: 'es2015',
                configValue: !config.es2015
              })
            }}
          >
            ES2015
          </Checkbox>
          <Description>
            Features according to ES2015 spec
          </Description>
        </div>
        <div className={styles.section}>
          <Checkbox
            disabled={!config}
            checked={config && config['stage-0']}
            onChange={() => {
              loaderConfigChanged({
                loaderName: 'babel',
                configName: 'stage-0',
                configValue: !config['stage-0']
              })
            }}
          >
            Stage-0
          </Checkbox>
          <Description>
            Latest ES features
          </Description>
        </div>
        <div className={styles.section}>
          <Checkbox
            disabled={!config}
            checked={config && config.react}
            onChange={() => {
              loaderConfigChanged({
                loaderName: 'babel',
                configName: 'react',
                configValue: !config.react
              })
            }}
          >
            React
          </Checkbox>
          <Description>
            React JSX support
          </Description>
        </div>
        <div className={styles.section}>
          <Checkbox
            disabled={!config}
            checked={config && typeof config.jsx === 'string'}
            onChange={() => {
              loaderConfigChanged({
                loaderName: 'babel',
                configName: 'jsx',
                configValue: config.jsx ? false : 'h'
              })
            }}
          >
            JSX
          </Checkbox>
          <div className={styles.input}>
            Pragma: <Input
              disabled={!config || typeof config.jsx !== 'string'}
              value={config && config.jsx || ''}
              onInput={(event) => {
                loaderConfigChanged({
                  loaderName: 'babel',
                  configName: 'jsx',
                  configValue: event.target.value
                })
              }}
            />
          </div>
          <Description>
            Custom JSX support, defaults to hyperscript pragma
          </Description>
        </div>
      </div>
    )
  }
)
