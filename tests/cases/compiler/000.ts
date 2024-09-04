// @strict: true
// @target: esnext
// @noEmit: true

// TODO: debug.ts, supporting FlowElementAccess

interface PersonP {
    name: string
    age: number
}

type Payload =
| { _tag: "key", secret: string }
| { _tag: "cart", cart: [] }
| { _tag: "person", person: PersonP }

declare const p: Payload

// THIS IS HOW SWITCH FLOW ANALYSIS WORKS
//
// switch(p._tag) {
//     case "key": {
//         // @getTypeAtSwitchClause
//         // reference is p
//         // expr is p._tag
//         // flowType, the antecedent type, is Payload
//         // access is p._tag

//         // @narrowTypeBySwitchOnDiscriminantProperty
//         // _tag is accessed property name

//         // @narrowTypeByDiscriminant
//         // propName is _tag
//         // propType becomes "key" | "cart"

//        // @narrowTypeBySwitchOnDiscriminant
//         // clauseStart, clauseEnd are 0, 1...the indexes of the first case clause
//         // switchTypes becomes ["key", "cart", never]
//         // clauseTypes will be ["key"]
//         //
//         // hasDefaultClause is false because this case has a break, so it doesn't contain the default clause
//         // so there is no never in clauseTypes
//         //
//         // discriminantType will be just "key"
//         // caseType is the same, in this case, because it just does a simpler intersection between types like
//         // string & a string literal, number & a number literal, etc.
//         //
//         // => narrowedPropType in narrowTypeByDiscriminant will be "key"
//         // => at this level `type` is the Payload type, so it will be narrowed to just
//         //    { _tag: "key", secret } by the filterType
//         p
//         p.secret
//         break
//     }
//     case "cart": {
//         p
//         p.cart
//         break
//     }
//     // case "person": {
//     //     p
//     //     p.person
//     //     break
//     // }
//     default: {
//         p // never
//     }
// }
//
// END OF SWITCH FLOW ANALYSIS COMMENT

// it refines p inside getters :)
const res = {
  //  ^?
    get key() {
        p
     // ^?
        return p.secret
    },
    get person() {
        p
    //  ^?
        return p.person
    },
    get cart() {
        p
     // ^?
        return p.cart
    }
}[p._tag]

function dependentLikeWrong<K extends Payload["_tag"]>(payload: Payload & { _tag: K }) {
    switch(payload._tag) {
        case "key": {
            payload
            payload.secret
            break
        }
        case "cart": {
            payload
            payload.cart
            break
        }
        case "person": {
            payload
            payload.person
            break
        }
    }
}

// it retuns : string | [] | PersonP :)
function dependentLikeSemiGood<P extends Payload>(payload: P) {
  return {
    get key() {
      return payload.secret
    },
    get person() {
      return payload.person
    },
    get cart() {
      return payload.cart
    }
  }[payload._tag]
}

namespace Expected {
  function dependentLike<K extends Payload["_tag"]>(payload: Payload & { _tag: K }) {
    return {
      get key() {
        return payload.secret // payload refined to { _tag: "key", secret: string }
      },
      get person() {
        return payload.person // payload refined to { _tag: "person", person: unknown }
      },
      get cart() {
        return payload.cart // payload refined to { _tag: "cart", cart: [] }
      }
    }[payload._tag]
  }
  // expected return type is `{ key: string, person: PersonP, cart: never[] }[K]`
}