import * as THREE from './build/three.module.js';

import { GUI } from './jsm/libs/dat.gui.module.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { OutlineEffect } from './jsm/effects/OutlineEffect.js';
import { MMDLoader } from './jsm/loaders/MMDLoader.js';
import { MMDAnimationHelper } from './jsm/animation/MMDAnimationHelper.js';

export class gui{

    constructor(mesh){
        
        this.initEngGui();
        this.initGui(mesh);
    }

    initGui(mesh) {

        const gui = new GUI();
        const vpds = [];
        const vpdFiles = [
            'models/mmd/vpds/01.vpd',
            'models/mmd/vpds/02.vpd',
            'models/mmd/vpds/03.vpd',
            'models/mmd/vpds/04.vpd',
            'models/mmd/vpds/05.vpd',
            'models/mmd/vpds/06.vpd',
            'models/mmd/vpds/07.vpd',
            'models/mmd/vpds/08.vpd',
            //'models/mmd/vpds/09.vpd',
            //'models/mmd/vpds/10.vpd',
            'models/mmd/vpds/11.vpd'
        ];

        var dictionary = mesh.morphTargetDictionary;

        const new_directory = {};
        for (const key in dictionary) {
            new_directory[`${Object.keys(dictionary).indexOf(key)+1}. ${key}`] = dictionary[key];
        }
        dictionary = new_directory;

        const controls = {};
        const keys = [];

        const poses = gui.addFolder( 'Poses' );
        const morphs = gui.addFolder( 'Morphs' );

        function getBaseName( s ) {

            return s.slice( s.lastIndexOf( '/' ) + 1 );

        }

        function initControls() {

            for ( const key in dictionary ) {

                controls[ key ] = 0.0;

            }

            controls.pose = - 1;

            for ( let i = 0; i < vpdFiles.length; i ++ ) {

                controls[ getBaseName( vpdFiles[ i ] ) ] = false;

            }

        }

        function initKeys() {

            for ( const key in dictionary ) {

                keys.push( key );
            }

        }

        function initPoses() {

            const files = { default: - 1 };

            for ( let i = 0; i < vpdFiles.length; i ++ ) {

                files[ getBaseName( vpdFiles[ i ] ) ] = i;

            }

            poses.add( controls, 'pose', files ).onChange( onChangePose );

        }

        function initMorphs() {

            for ( const key in dictionary ) {

                morphs.add( controls, key, 0.0, 1.0, 0.01 ).onChange( onChangeMorph );

            }

        }

        function onChangeMorph() {

            for ( let i = 0; i < keys.length; i ++ ) {

                const key = keys[ i ];
                const value = controls[ key ];
                mesh.morphTargetInfluences[ i ] = value;

            }

        }

        function onChangePose() {

            const index = parseInt( controls.pose );

            if ( index === - 1 ) {

                mesh.pose();

            } else {

                helper.pose( mesh, vpds[ index ] );

            }

        }

        initControls();
        initKeys();
        initPoses();
        initMorphs();

        onChangeMorph();
        onChangePose();

        poses.open();
        morphs.open();

    }


    initEngGui(){
        const guiEng = new GUI();
        let controls = {};
        let stdlocal = {};
        var standardlist = {eyebrow_troubled_left: 0, eyebrow_troubled_right:0,eyebrow_angry_left:0,eyebrow_angry_right:0,eyebrow_serious_left:0,eyebrow_serious_right:0,eyebrow_happy_left:0
            ,eyebrow_happy_right:0,eyebrow_lowered_left:0,eyebrow_lowered_right:0,eyebrow_raised_left:0,eyebrow_raised_right:0,eye_wink_left:0
            ,eye_wink_right:0,eye_happy_wink_left:0,eye_happy_wink_right:0,eye_relaxed_left:0,eye_relaxed_right:0,eye_unimpressed_left:0
            ,eye_unimpressed_right:0,eye_raised_lower_eyelid_left:0,eye_raised_lower_eyelid_right:0,eye_surprised_left:0,eye_surprised_right:0,iris_small_left:0,iris_small_right:0
            ,mouth_aaa:0,mouth_iii:0,mouth_uuu:0,mouth_eee:0,mouth_ooo:0,mouth_delta:0,mouth_smirk:0,mouth_raised_corner_left:0,mouth_raised_corner_right:0,mouth_lowered_corner_left:0,mouth_lowered_corner_right:0};
        const stdlist = guiEng.addFolder( 'stdlist' );

        for ( const key in standardlist ) {

            controls[ key ] = -1;

        }
        for ( const key in standardlist ) {

            stdlist.add( controls, key);

        }
        function onChangeMorph() {
            for( let i = 0; i < object.keys(standardlist).length(); i++){
                const key = standardlist[i];
                const value = controls[key];
            }
        }
        stdlocal = controls;
        stdlist.open();
        
    }
}
