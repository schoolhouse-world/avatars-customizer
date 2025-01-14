import React from 'react'
import Avatar, { Piece } from '@schoolhouse/avatars'
import map from 'lodash/map'
import styles from './styles.css'
import options from './options'

export default function AvatarsCustomizer(props) {
  const [selectedTab, setSelectedTab] = React.useState('top')

  function pieceClicked(attr, val) {
    var newAttributes = {
      ...props.value,
      [attr]: val,
    }
    if (props.onChange) {
      props.onChange(newAttributes)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Avatar style={{ width: '200px', height: '200px' }} avatarStyle="Circle" {...props.value} />
      </div>
      <div className={styles.tabs}>
        {map(options, option => {
          return (
            <div
              key={option.type}
              className={styles.tab + ' ' + (selectedTab == option.type ? styles.selectedTab : '')}
              onClick={() => setSelectedTab(option.type)}
            >
              {option.label}
            </div>
          )
        })}
      </div>
      <div className={styles.tabpanes}>
        {map(options, option => {
          return (
            <div
              key={option.type}
              className={styles.tabpane + ' ' + (selectedTab == option.type ? styles.visible : '')}
            >
              {map(option.values, val => {
                var attr = {}
                attr[option.attribute] = val
                if (option.transform) {
                  attr.style = { transform: option.transform }
                }
                if (option.type === 'clothe' && attr[option.colorAttribute] == null) {
                  attr[option.colorAttribute] = 'Black'
                }
                return (
                  <div
                    key={val}
                    className={styles.piece}
                    onClick={() => pieceClicked(option.attribute, val)}
                  >
                    <Piece pieceSize="50" pieceType={option.type} {...attr} />
                    {(val === 'Blank' || val === 'NoHair') && (
                      <div className={styles.none}>(none)</div>
                    )}
                  </div>
                )
              })}
              <div className={styles.colorContainer}>
                {option.colors &&
                  (option.type !== 'top' || option.hats.indexOf(props.value.topType) === -1) &&
                  props.value.topType !== 'Eyepatch' &&
                  props.value.topType !== 'LongHairShavedSides' &&
                  props.value.topType !== 'LongHairFrida' &&
                  map(option.colors, (color, colorName) => {
                    return (
                      <div
                        key={colorName}
                        className={styles.color}
                        style={{
                          backgroundColor: color,
                          border: color === '#FFFFFF' ? '1px solid #ccc' : '1px solid ' + color,
                        }}
                        onClick={() => pieceClicked(option.colorAttribute, colorName)}
                      />
                    )
                  })}

                {option.hatColors &&
                  option.hats.indexOf(props.value.topType) !== -1 &&
                  props.value.topType !== 'Hat' &&
                  map(option.hatColors, (color, colorName) => {
                    return (
                      <div
                        key={colorName}
                        className={styles.color}
                        style={{
                          backgroundColor: color,
                          border: color === '#FFFFFF' ? '1px solid #ccc' : '1px solid ' + color,
                        }}
                        onClick={() => pieceClicked('hatColor', colorName)}
                      />
                    )
                  })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
